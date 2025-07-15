---
title: Production Liasion Guidelines
description: Production Liasion Guidelines
name: production liasion guidelines
layout: default
---

{% include layouts/title.md %}

---
# Getting User Accounts

You should get a computing user account on JeffersonLab, Open Science Grid, or Brookhaven National Lab. The instructions to get accounts on each of the sites can be found in the links below:
1. [Jefferson Lab Account Access](https://misportal.jlab.org/jlabAccess/)
2. [Open Science Grid Account Access](https://www.ci-connect.net/signup)
3. [Brookhaven Lab Account Access](https://www.sdcc.bnl.gov/information/getting-started/new-user-account)

Obtaining access to multiple sites is good for redundancy. 


# Getting Approved for OSG Access Points (APs)

### Jefferson Lab
```bash
ssh <username>@scilogin.jlab.org -Y
# Use your 2-factor Safenet password
```

You have to setup the 2-factor Safenet password by calling the helpdesk at +1(757)2697155 after your account creation is done. You will receive the relevant links on your [JLab email](https://webmail.jlab.org/) which can be accessed by your regular JLab password. 

Once you have access to the JLab login node, file a ticket with [JLab Service Now](https://jlab.servicenowservices.com) to gain access to osg-eic access point. 

Mention in the ticket that you will be submitting simulation jobs to OSG on behalf of the ePIC experiment. Once approved, you will be able to login to osg-eic after logging into the JLab login node. 

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

Once you have access to the sdcc login node, file a ticket with RT-RACF-UserAccounts@bnl.gov to get access to the osgsub01 node and mention that that you will be using it to submit jobs on behalf of the ePIC collaboration. Once approved, you can log onto the access point after logging onto the sdcc login node.  

```bash
ssh <username>@osgsub01 -Y
```

Report any difficulties to the above-mentioned email for filing tickets. 

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

Run the following command and update your ticket on jlab service now with the output:

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

Then you can transfer the files from the source location to desired directory structure on JLAB RSE following the [input pre-processing guidelines](https://eic.github.io/epic-prod/documentation/input_preprocessing.html). Make sure that the dataset can be traced to a version controlled github repo before this transfer happens because you will need the version tag for the directory structure and nomenclature. An example of the transfer is shown here:
```
timestamp=$(date '+%Y-%m-%d_%H-%M-%S')
python /opt/campaigns/hepmc3/scripts/register_to_rucio.py \
-f "test.hepmc3.tree.root" \
-d "/EVGEN/Test/test-${timestamp}.hepmc3.tree.root" \
-s epic -r EIC-XRD
```
Once all your input files are uploaded, create a PR similar to [this](https://eicweb.phy.anl.gov/EIC/campaigns/datasets/-/merge_requests/94/diffs) on the [datasets repository](https://github.com/eic/simulation_campaign_datasets/) with csv file catalogues for the respective datasets and integration line in the config.yml file. 
