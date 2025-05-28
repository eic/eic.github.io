---
title: Production Files Access
description: production_file
name: production_file
layout: default
---

{% include layouts/title.md %}

# Production Files Access

Starting from production campaign 25.01.1 onwards. Now files are registred to a catalog in Rucio (Data Mangement Software).
All old files will be registred to rucio, notification to follow

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
    - `epic:/LOGS/...` for Log files

## Step by step guide.
### First find the location of files.

- **List datasets for a campaign** :
    command: `rucio list-dids --short <dids>`
    ```shell
    $ rucio list-dids --short epic:/RECO/25.01.1/\*

    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/18x275/minQ2=100
    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=1
    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/18x275/minQ2=1000
    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/18x275/minQ2=1
    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10
    epic:/RECO/25.01.1/epic_craterlake/BACKGROUNDS/SYNRAD/dataprod_rel_1.0.0/18x275
    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/18x275/minQ2=10
    ....
    ```
    Note: The list shown above is truncated for preview.
    Replace `25.01.1` with any other campaign.

- **List files within a dataset**:
    command: `rucio list-content --short <did>`
    ```shell
    $ rucio list-content --short epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10

    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.1105.eicrecon.tree.edm4eic.root
    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.1106.eicrecon.tree.edm4eic.root
    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.1107.eicrecon.tree.edm4eic.root
    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.1108.eicrecon.tree.edm4eic.root
    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.1109.eicrecon.tree.edm4eic.root
    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.1110.eicrecon.tree.edm4eic.root
    epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.1111.eicrecon.tree.edm4eic.root
    ```
     Note: The list shown above is truncated for preview.

- **Find location of files**:
    command: `rucio list-file-replicas --protocol root --pfns <did>`
    ```shell
     $ rucio list-file-replicas --protocol root --pfns --rses isopen epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root

    root://dtn-rucio.jlab.org:1094//volatile/eic/EPIC//RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root
    ```
    If you see multiple replicas you can use any one of those.

#### Access methods for production files include:

- **Download all files in a dataset at once with `rucio download <dataset>`**
    ```shell
    rucio download epic:/RECO/25.01.1/epic_craterlake/DIS/NC/18x275/minQ2=100
    ```

    or multiple datasets at once
    ```shell
    rucio download <dataset1> <dataset2>
    ```

- **Download single file with `rucio download <file_did>`**
    ```shell
    rucio download epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.1105.eicrecon.tree.edm4eic.root
    ```

- **Copying with `xrdcp`:**
    ```shell
    xrdcp root://dtn-rucio.jlab.org:1094//volatile/eic/EPIC/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root <local destination>
    ```

- **Copying with `gfal-copy`:**
    ```shell
    gfal-copy root://dtn-rucio.jlab.org:1094//volatile/eic/EPIC/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root <local destination>
    ```

- **Opening directly with ROOT:**
    ```c++
    auto f = TFile::Open("root://dtn-rucio.jlab.org:1094//volatile/eic/EPIC/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root")
    ```
    or using Python
    ```python
    import uproot
    file_path = "root://dtn-rucio.jlab.org:1094//volatile/eic/EPIC/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root"
    root_file = uproot.open(file_path)
    ```

    ```python
    import ROOT
    file_path = "root://dtn-rucio.jlab.org:1094//volatile/eic/EPIC/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root"
    file = ROOT.TFile.Open(file_path, "READ")
    ```

