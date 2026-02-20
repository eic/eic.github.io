---
title: Production Files Access
description: production_file
name: production_file
layout: default
---

{% include layouts/title.md %}

# Production Files Access

Starting from production campaign 25.01.1 onwards. Now files are registred to a catalog in Rucio (Data Mangement Software).
All old files will be registred to rucio, notification to follow.

To see what files are available and how to access it use Rucio.

- Files are now registered with Rucio, the Data Management System.
- Access Rucio client from `eic-shell`:
    ```shell
    $ ./eic-shell
    $ rucio whoami
    ```

- Files are registered in Rucio with a format similar to xrootd, excluding the base path `/volatile/eic/EPIC`.
- Data Identifiers (DID) are structured as `scope:name`. For "epic," the scope is always `epic`, resulting in DIDs like:
    - `epic:/EVGEN/...` for EVEGEN files
    - `epic:/FULL/...` for FULL simulation files
    - `epic:/RECO/...` for Reconstructed output files

## Step by step guide.
### First find the location of files.

- **List datasets for a campaign** :
    command: `rucio did list --short <dids>`
    ```shell
    $ rucio did list --short epic:/RECO/26.02.0/\*

    epic:/RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg
    epic:/RECO/26.02.0/epic_craterlake/EXCLUSIVE/DEMP/DEMPgen-1.2.4/10x130/q2_10_20/pi+
    epic:/RECO/26.02.0/epic_craterlake/EXCLUSIVE/DEMP/DEMPgen-1.2.4/10x130/q2_20_35/pi+
    epic:/RECO/26.02.0/epic_craterlake/EXCLUSIVE/DEMP/DEMPgen-1.2.4/10x130/q2_3_10/pi+
    epic:/RECO/26.02.0/epic_craterlake/EXCLUSIVE/DEMP/DEMPgen-1.2.4/10x250/q2_10_20/pi+
    epic:/RECO/26.02.0/epic_craterlake/SINGLE/e-/100MeV/3to50deg
    epic:/RECO/26.02.0/epic_craterlake/SINGLE/e-/10GeV/3to50deg

    ....
    ```
    Note: The list shown above is truncated for preview.
    Replace `25.01.1` with any other campaign.

  **As a reminder, campaigns follow a YY.MM.Ver formatting - E.g. 25.01.1 is January 2025, version 1. Campaigns more than 6 months old may not be readily accessible.**
  
- **List files within a dataset**:
    command: ` rucio did content list --short <did>`
    ```shell
    $ rucio did content list --short epic:/RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg

    epic:/RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0000.eicrecon.edm4eic.root
    epic:/RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0001.eicrecon.edm4eic.root
    epic:/RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0002.eicrecon.edm4eic.root
    epic:/RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0003.eicrecon.edm4eic.root
    epic:/RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0004.eicrecon.edm4eic.root
    epic:/RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0005.eicrecon.edm4eic.root
    epic:/RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0006.eicrecon.edm4eic.root
    ```
     Note: The list shown above is truncated for preview.

- **Find location of files**:
    command: `rucio replica list file --protocol root --pfns <did>`
    ```shell
     $ rucio replica list file --protocols root --pfns --rses isopenaccess epic:/RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0068.eicrecon.edm4eic.root

    root://dtn-eic.jlab.org:1094//volatile/eic/EPIC//RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0068.eicrecon.edm4eic.root
    ```
    If you see multiple replicas you can use any one of those. You can check using `rucio rse list --rses isopenaccess` for a full list of RSE's.

#### Access methods for production files include:

- **Download all files in a dataset at once with `rucio download <dataset>`**
    ```shell
    rucio download epic:/RECO/25.01.1/epic_craterlake/DIS/NC/18x275/minQ2=100
    ```

    or multiple datasets at once
    ```shell
    rucio download <dataset1> <dataset2>
    ```
**Note that in general, there is no need to download a dataset in full. Full datasets can be very large. Carefully consider whether you need to download a full dataset before doing so!**

- **Download single file with `rucio download <file_did>`**
    ```shell
    rucio download epic:/RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0068.eicrecon.edm4eic.root
    ```

- **Copying with `xrdcp`:**
    ```shell
    root://dtn-eic.jlab.org:1094//volatile/eic/EPIC//RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0068.eicrecon.edm4eic.root <local destination>
    ```

- **Copying with `gfal-copy`:**
    ```shell
    gfal-copy root://dtn-eic.jlab.org:1094//volatile/eic/EPIC//RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0068.eicrecon.edm4eic.root <local destination>
    ```

- **Opening directly with ROOT:**
    ```c++
    auto f = TFile::Open("root://dtn-eic.jlab.org:1094//volatile/eic/EPIC//RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0068.eicrecon.edm4eic.root")
    ```
    or using Python
    ```python
    import uproot
    file_path = "root://dtn-eic.jlab.org:1094//volatile/eic/EPIC//RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0068.eicrecon.edm4eic.root"
    root_file = uproot.open(file_path)
    ```

    ```python
    import ROOT
    file_path = "root://dtn-eic.jlab.org:1094//volatile/eic/EPIC//RECO/26.02.0/epic_craterlake/SINGLE/e+/500MeV/3to50deg/e+_500MeV_3to50deg.0068.eicrecon.edm4eic.root"
    file = ROOT.TFile.Open(file_path, "READ")
    ```

