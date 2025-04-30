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
2. [Open Science Grid Account Access](https://https://www.ci-connect.net/signup)
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
### Getting a Certificate and Key

1. If you have a jlab account, file a ticket with [Service Now](https://jlab.servicenowservices.com/) asking for a certificate to be able access ePIC Rucio in the context of OSG job submission. If you don't have a jlab account, contact the [production WG](https://eic.github.io/epic-prod/about/contact.html) to file a ticket on your behalf.

2. You will receive an email from support@cert-manager.com with the instruction to download your .cer file.
​
3. Once you have received this .cer file, transfer this to the access point you will be using. Please request the production WG to provide you with the key corresponding to your .cer file. Your key will be placed in the access point according to your request (BNL, JLAB or OSG). 
​
4. Move certificates and keys to a desired location and change the permissions.
    ```bash
    chmod 600 usercert.cer
    chmod 600 userkey.key
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
voms-proxy-init -cert=usercert.cer -key=userkey.key -out=x509_user_proxy -hours=1460
```

This will create an proxy certificate in your current directory. 

### Send Information

Run the following command and email the output to `panta@jlab.org`:

```bash
voms-proxy-info -file=x509_user_proxy | grep "issuer" | awk -F":" '{print $2}'
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
