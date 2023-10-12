---
title: Distributed Storage
description: Storage
name: storage
layout: default
---

{% include layouts/title.md %}

#### S3
The main storage for EIC-related files is on S3 interface, for EIC use.

This storage is accessed via the "MinIO" client - named *"mc"* - available for download from the MinIO site on its
{% include navigation/findlink.md name='minio_download' tag='download page' %}, or installed on the farms and inside `eic-shell`.
Please obtain the read-only access key from the ePIC mattermost channel. Then, in a bash-like environment add 
```
export S3_ACCESS_KEY=[ask in mattermost]
export S3_SECRET_KEY=[ask in mattermost]
```
to your initialization file (e.g. `.bashrc`), or
```
setenv S3_ACCESS_KEY [ask in mattermost]
setenv S3_SECRET_KEY [ask in mattermost]
```
to your equivalent init file (e.g. `.cshrc`).
You then run 
```
mc config host add S3 https://eics3.sdcc.bnl.gov:9000 $S3_ACCESS_KEY $S3_SECRET_KEY
```
and from then on you can use commands like
```
mc ls S3/eictest/EPIC/Tutorials
```


##### NextCloud/BNLbox: pre-generaged event datasets

The EIC group at BNL has a large amount (13 TB and growing) of
pre-generated events from Pythia, Milou, Djangoh, and others available
for download via NextCloud/BNLbox.
To access this data, no lab association is necessary. Simply contact
Kolja Kauder, kkauder_at_bnl.gov, and request a guest account.
You will receive an invitation where you can choose your password. From then on, you can log into
https://bnlbox.sdcc.bnl.gov
and find everything in the ```EIC_Data``` directory via the web interface.


##### Download from the command line

Instructions for using curl, cadaver, and a script that can download entire directories can be found
{% include navigation/findlink.md name='bnlbox_cli' tag='here' %}.
A few additional points that may simplify life:
* A copy of the ```copy_bnl_box.rb``` script is found inside ```EIC_Data```.
* Note to RCF users, you can access this data directly at
```bash
/gpfs02/eic/DATA
```
* IMPORTANT: As the documentation notes, guest accounts work simply with the email + password combination.
However, do choose a reasonably strong password, but do NOT reuse a password you use for any other service!
If you use the command line interface, this password may well be sent unencrypted and/or be in a clear-text
file on your computer.
* Assuming your guest account was created for myemail@myprovider.com, the path to the directory will always have a specific form and you can use an environment variable as a shortcut:
```bash
export eicdataurl='https://bnlbox.sdcc.bnl.gov/remote.php/dav/files/myemail@myprovider.com/EIC_Data'
```
or
```bash
setenv eicdataurl 'https://bnlbox.sdcc.bnl.gov/remote.php/dav/files/myemail@myprovider.com/EIC_Data'
```
This way, you can (with a suitably configured .netrc) use something like:
```bash
curl -O -n ${eicdataurl}/copy_bnl_box.rb
```


##### Adding to the collection
There is more than enough space available to fulfill all storage needs
of the Yellow Report effort as reported in the recent poll to working
groups. To make use of it, please contact the software working group
so we can determine together the most efficient way to upload your
data and make it accessible to the whole community!

<hr/>

