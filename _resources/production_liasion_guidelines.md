---
title: Production Liasion Guidelines
description: Production Liasion Guidelines
name: production liasion guidelines
layout: default
---

{% include layouts/title.md %}

---
# Getting User Accounts

The following steps assume that you have an account on one or more of the access points (APs) at JeffersonLab, Open Science Grid, or Brookhaven National Lab. The instructions to get accounts on each of the access points can be found in the links below:
1. [Jefferson Lab Account Access](https://misportal.jlab.org/jlabAccess/)
2. [Open Science Grid Account Access](https://portal.osg-htc.org/application)
3. [Brookhaven Lab Account Access](https://www.sdcc.bnl.gov/information/getting-started/new-user-account)

Follow the instructions in the respective links to get your account and then log in to the access point.

### Jefferson Lab
```bash
ssh <username>@scilogin.jlab.org -Y
# Use your 2-factor Safenet password
```
```bash
ssh <username>@osg-eic -Y
# Use your 2-factor Safenet password
```

If you are having trouble with account access, call JeffersonLab helpdesk at +1(757)2697155.

### Open Science Grid
```bash
ssh <username>@ap23.uc.osg-htc.org -Y
# If you already set up your SSH keys on ci-connect, you will only need to enter your 2-factor password
```

If you are having trouble with account access, email support@osg-htc.org.

### Brookhaven National Lab
```bash
ssh <username>@ssh.sdcc.bnl.gov -Y
```

If you are having trouble with account access, email RT-RACF-UserAccounts@bnl.gov.


---
# Getting Write Access to Jefferson Lab Rucio Storage Endpoint (RSE)
### Getting a Certificate from CILogon

You will need to obtain your user certificate using the CILogon web UI. Follow the steps below to get a user certificate:

1. Open the [CILogon page](https://cilogon.org) in your browser.
2. Search for your institution or scroll through the list and select it.
   
   **Warning:**  
   Do not use Google, GitHub, or ORCID as providers since they are not widely supported in the OSG. If your institution is not on the list, contact your institution's IT support to check if they can support CILogon.

3. Click the "Log On" button and enter your institutional credentials if prompted.
4. After successfully entering your credentials, click on the **Create Password-Protected Certificate** link.
5. Enter a password that is at least 12 characters long and then click on the **Get New Certificate** button.
6. Click **Download Your Certificate** to download your certificate in `.p12` format. The certificate will be protected by the password you created.



### Generating User Keys

1. Open `eic-shell`:
    ```bash
    curl -L https://github.com/eic/eic-shell/raw/main/install.sh | bash
    ./eic-shell
    ```
2. Generate the keys. You will be prompted to enter the import password you used when generating the certificate. Then, exit out of the container:
    ```bash
    openssl pkcs12 -in usercred.p12 -out usercert.pem -clcerts -nokeys -legacy
    openssl pkcs12 -in usercred.p12 -out userkey.pem -nocerts -nodes -legacy
    exit
    ```
3. Move certificates and keys to the `.globus` folder:
    ```bash
    mkdir ~/.globus
    mv user* ~/.globus
    chmod 600 ~/.globus/usercert.pem
    chmod 600 ~/.globus/userkey.pem
    ```



### Installing voms-client

You will need the `voms-client` on a Linux machine. If you are on your local Linux machine, then do:

```bash
sudo apt-get install voms-clients-java
```
All the access points should already have the `voms-client` installed. So, you can skip this step if you are already on one. 



### Running voms-proxy-init

Run the following command to generate a voms proxy certificate with a validity of at least 2 months (1460 hours):

```bash
voms-proxy-init --hours 1460
```

This will create an X.509 proxy certificate in your `/tmp` directory. You can rename it as `x509_user_proxy` and use it for production or uploading files to the Jefferson Lab storage system.



### Send Information

Run the following command and email the output to `panta@jlab.org`:

```bash
voms-proxy-info | grep "issuer" | awk -F":" '{print $2}'
```
You only need to do this once. 

---
# Integrating a New Dataset in Production

Run eic-shell and set the rucio variables
```bash
./eic-shell
export RUCIO_CONFIG=/opt/campaigns/hepmc3/scripts/rucio.cfg
export X509_USER_PROXY=x509_user_proxy
```

Then you can transfer the files from the source location to desired directory structure on JLAB RSE following the [input pre-processing guidelines](https://eic.github.io/epic-prod/documentation/input_preprocessing.html). An example is shown here:
```
python /opt/campaigns/hepmc3/scripts/register_to_rucio.py \
-f "/work/eic3/users/sjdkay/Mar2025_Campaign_Input/Afterburner_Output/kaonLambda/10on130/DEMPgen-v1.2.3_K+LambdaDEMP_10on130_q2_20_35.hepmc3.tree.root" \
-d "/EVGEN/EXCLUSIVE/DEMP/DEMPgen-1.2.3/10x130/q2_20_35/K+Lambda/DEMPgen-1.2.3_10x130_K+Lambda_q2_20_35_hiAcc.hepmc3.tree.root" \
-s epic -r EIC-XRD
```

Once they are uploaded, create a PR similar to [this](https://eicweb.phy.anl.gov/EIC/campaigns/datasets/-/merge_requests/94/diffs) on the [datasets repository](https://github.com/eic/simulation_campaign_datasets/) with csv file catalogues for the respective datasets and integration line in the config.yml file. 
