From production campaign 25.01.1 , there are following two changes.

1. Files are now written to different location. Previous location /work/eic2 -> New location /volatile/eic. And all the old files are transferred to this new location.

    with this you can use following way to access the procution files.
    
    A. To list the files:
    ```shell
    xrdfs root://dtn-eic.jlab.org
    ls /volatile/eic/EPIC
    ```
    B. To copy the file to local destination:
    ```shell
    xrdcp root://dtn-eic.jlab.org//volatile/eic/EPIC/RECO/23.12.1/epic_craterlake/DIS/NC/18x275/minQ2=1000/pythia8NCDIS_18x275_minQ2=1000_beamEffects_xAngle=-0.025_hiDiv_1.0000.eicrecon.tree.edm4eic.root <local destination>
    ```
    
    C. To directly use file to root TFile::Open:
    ```c++
    auto f = TFile::Open("root://dtn-eic.jlab.org//volatile/eic/EPIC/RECO/23.12.0/epic_craterlake/DIS/NC/18x275/minQ2=1000/pythia8NCDIS_18x275_minQ2=1000_beamEffects_xAngle=-0.025_hiDiv_1.0000.eicrecon.tree.edm4eic.root")
    ```

2. File are registered to Rucio (data manageent system).
    
    Rucio client is now available on eic-shell as:

    ```shell
    $ ./eic-shell
    $ rucio whoami
    ```

    Files are registered to rucio in a format which is same as xrootd format except for base path (/volatile/eic/EPIC)
    In rucio we have data identifier (DID) as unit which is `scope:name` . For epic scope is always `epic` aresulting in DIDs

    
    - epic:/EVGEN/...   -> EVEGEN files
    - epic: /FULL/...   -> FULL simulation files
    - epic:/RECO/...    -> Reconstructed output files
    - epic:/LOGS/...    -> Log files

    DID are divided into dataset and files. Each dataset contains files.

    To the dataset for a compaign :
    ```shell
    $ rucio list-dids epic:/RECO/25.01.1/*
    ```
    Output (truncated) looks like:
    ```
    rucio list-dids epic:/RECO/25.01.1/*
    +-------------------------------------------------------------------------------------+--------------+
    | SCOPE:NAME                                                                          | [DID TYPE]   |
    |-------------------------------------------------------------------------------------+--------------|
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10                           | DATASET      |
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/18x275/minQ2=10                           | DATASET      |
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=100                          | DATASET      |
    | epic:/RECO/25.01.1/epic_craterlake/EXCLUSIVE/DVCS_ABCONV/10x100                     | DATASET      |
    | epic:/RECO/25.01.1/epic_craterlake/EXCLUSIVE/DVCS_ABCONV/18x275                     | DATASET      |
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=1000                         | DATASET      |
    | epic:/RECO/25.01.1/epic_craterlake/EXCLUSIVE/TCS_ABCONV/10x100/hel_minus            | DATASET      |
    ```
    To see the files in a dataset:
    ```shell
    $ rucio list-content epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10
    ```
    ```
    +----------------------------------------------------------------------------------------------------------------------------------------------------------+--------------+
    | SCOPE:NAME                                                                                                                                               | [DID TYPE]   |
    |----------------------------------------------------------------------------------------------------------------------------------------------------------+--------------|
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root | FILE         |
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0259.eicrecon.tree.edm4eic.root | FILE         |
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0258.eicrecon.tree.edm4eic.root | FILE         |
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0251.eicrecon.tree.edm4eic.root | FILE         |
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0254.eicrecon.tree.edm4eic.root | FILE         |
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0253.eicrecon.tree.edm4eic.root | FILE         |
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0256.eicrecon.tree.edm4eic.root | FILE         |
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0250.eicrecon.tree.edm4eic.root | FILE         |
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0252.eicrecon.tree.edm4eic.root | FILE         |
    | epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0257.eicrecon.tree.edm4eic.root | FILE         |
    ```

    To see the location of files: (AP: rewrite after root potocol is allowed)
    ```shell
    $ rucio list-file-replicas  epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root
    ```
    ```
    rucio list-file-replicas  epic:/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root
    +---------+-----------------------------------------------------------------------------------------------------------------------------------------------------+------------+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | SCOPE   | NAME                                                                                                                                                | FILESIZE   | ADLER32   | RSE: REPLICA                                                                                                                                                                                                   |
    |---------+-----------------------------------------------------------------------------------------------------------------------------------------------------+------------+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | epic    | /RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root | 133.673 MB | 95e961ad  | EIC-XRD: https://dtn-rucio.jlab.org:1094//volatile/eic/EPIC/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root |
    +---------+-----------------------------------------------------------------------------------------------------------------------------------------------------+------------+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

    ```
    to get the files you can use:
    ```shell
    xrdcp --allow-http https://dtn-rucio.jlab.org:1094//volatile/eic/EPIC/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root <local_destination>
    ```

    or
    ```shell
    gfal-copy https://dtn-rucio.jlab.org:1094//volatile/eic/EPIC/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root <local_destination>
    ```

    or replace https with root protocol
    ```shell
    xrdcp root://dtn-rucio.jlab.org:1094//volatile/eic/EPIC/RECO/25.01.1/epic_craterlake/DIS/NC/10x100/minQ2=10/pythia8NCDIS_10x100_minQ2=10_beamEffects_xAngle=-0.025_hiDiv_5.0255.eicrecon.tree.edm4eic.root <local_destination>
    ```

