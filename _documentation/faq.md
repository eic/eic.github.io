---
title: FAQ
description: FAQ
name: faq
layout: default
---

{% include layouts/title.md %}

Welcome to the **Frequently Asked Questions** page!
Please use the [Helpdesk](https://eic.cloud.mattermost.com/main/channels/helpdesk) on Mattermost for urgent correspondence.

Submit new questions and comments by email: [![emailicon](../assets/images/site/icons/email.png){: width="3%" }](mailto:epic-sc-faq-l@lists.bnl.gov)

------------------------
**Q: How can we browse the simulation output from a specific campaign and locate certain output files?**

A: Visit the [epicprod website](https://eic.github.io/epic-prod/campaigns/campaigns_reco.html) to view the list of avaiable campaigns. Pick a campaign that you want to view in detail. For example: [23.12.0](https://eic.github.io/epic-prod/RECO/23.12.0/). Here, you will find the output directories listed in a nested tree structure. The directory nomenclature usually follows the pattern:

```<base directory>/<campaign tag>/<detector config>/<physics processes>/<generator release tag if available>/<electron momentum>x<proton momentum>/<q2 range>/```

The preferred method to list the files in a directory is to use the xrdfs interface within eic-shell container. For example:
```
    xrdfs root://dtn-eic.jlab.org   
    ls /work/eic2/EPIC/RECO/23.09.1/epic_craterlake/DIS/NC/18x275/minQ2=1000
```
See more details [here](https://eic.github.io/epic-prod/documentation/faq.html).

**Q: What input datasets are used in a particular production campaign and where can I find them?**

A: The directory structure of the input datasets mimic the directory structure of the output files from `<physics processes>` onwards. Consider, the output files under `root://dtn-eic.jlab.org//work/eic2/EPIC/RECO/23.12.0/epic_craterlake/DIS/NC/10x100/minQ2=1`. The corresponding input datasets can be found in the following manner:

```
xrdfs root://dtn-eic.jlab.org
ls /work/eic2/EPIC/EVGEN/DIS/NC/10x100/minQ2=1
```

**Q: What is the procedure to introduce a new dataset into a production campaign or replace an existing one?**

A: Follow the input dataset creation [guidelines](https://eic.github.io/epic-prod/documentation/input_preprocessing.html) listed in the epic-prod website.

**Q: How can we load files into ROOT directly from xrootd?**

A: Enter the full file path including server address using root TFile::Open. For example:
```
    auto f = TFile::Open("root://dtn-eic.jlab.org//work/eic2/EPIC/RECO/23.12.0/epic_craterlake/DIS/NC/18x275/minQ2=1000/pythia8NCDIS_18x275_minQ2=1000_beamEffects_xAngle=-0.025_hiDiv_1.0000.eicrecon.tree.edm4eic.root")
```
See more details [here](https://eic.github.io/epic-prod/documentation/faq.html).

**Q: How can we copy files from xrootd?**

A: Use xrdcp with full path and local destination directory. For example:
```
xrdcp root://dtn-eic.jlab.org//work/eic2/EPIC/RECO/23.12.1/epic_craterlake/DIS/NC/18x275/minQ2=1000/pythia8NCDIS_18x275_minQ2=1000_beamEffects_xAngle=-0.025_hiDiv_1.0000.eicrecon.tree.edm4eic.root <local destination>
```

**Q: What is included in the campaign, and what are the major changes compared to before?**

A: We version track the [epic](https://github.com/eic/epic/releases) and [eicrecon](https://github.com/eic/eicrecon/releases) repositories and the new features introduced in a campaign are tracked in the release notes. For example: [epic-23.12.0](https://github.com/eic/epic/releases/tag/23.12.0) and [eicrecon-1.9.0](https://github.com/eic/eicrecon/releases/tag/1.9.0) represent the software changes introduced in December campaign. As of December, 2023 we have also began enforcing version tracking on our input datasets. 

**Q: How can we effectively use the information stored in EICRecon rootfile outputs, such as matching reconstructed particles to their MC particles?**

A: To an extent, this is covered in the [dRICH tutorials](https://github.com/eic/drich-dev/blob/tutorial/doc/tutorials/3-running-reconstruction.md), starting at session 3 and partly covered in existing [recorded tutorials](https://indico.bnl.gov/event/18373/). **TODO:** Probably needs to be supplemented with example codes. 

**Q: How can we apply beam effects, including adjusting the ion beam when using a particle gun?**

A: Beam effects are handled by the [afterburner](https://github.com/eic/afterburner), which expects HepMC3 input. They cannot be simply turned on in just the npsim particle gun. 

**Q: How do we check and change beam magnet settings for both simulation and reconstruction?**

A: **TODO:**Changing magnet configuration in reconstruction makes little sense. Checking and changing it for simulation should be answered by the prod group.


**Q: What is the best practice for analyzing EICrecon output, especially regarding hadron PID likelihoods?**

A: **TODO:** Needs an updated analysis tutorial. I don't believe at this point we have a simple unified PID likelihood approach.

**Q: How can we develop a benchmark for an analysis code to pass on to the validation software team?**

A: **TODO:** We originally planned a dedicated "Tutorial: Writing physics benchmarks that run automatically and reproducibly" - this needs to be revisited. Otherwise, Dmitry K, Wouter, Sylvester may be able to write up something short. This is a good FAQ candidate really, if we can get this answered.

**Q: How can we access various (SI)DIS variables through different reconstruction methods?**

A: **TODO:** Things like ``InclusiveKinematicsDA.cc`` are part of EicRecon, but I don't know how to use it. I don't believe it's calculated by default during campaigns, so one would still need an analysis level version. Would be good example analysis code, and I'm sure it exists in many forms on various people's laptops.

**Q: How do we match tracks and clusters from the calorimeters?**

**Q: How can we access hadron and electron PID data?**

A: You can access a sampled hypothesis via `PDG` field of the `ReconstructedParticle`. The `particleIDs` relation will contain all of the available hypotheses (for expert use).

**Q: How do we navigate from reconstructed to truth information?**

A: Needs a refreshed tutorial; needs example code

**Q: Is there an organized repository or wiki that guides newcomers to the right tutorials and slides?**

A: Yes, but the dRICH one is closest, plus the tutorials indico. **TODO:** Should be combined and front and center of the landing page.

**Q: Are there quick starter-code examples (Analyzer macros) for accessing branch information and creating physics plots?**

A: **TODO:** Yes, but not well organized and more is better.

**Q: Can you provide an example of analyzing EICrecon data using basic methods?**

A: [https://indico.bnl.gov/event/18373/](https://indico.bnl.gov/event/18373/) has some, so does the dRICH tutorial. **TODO:** Needs more example code.

**Q: How do I disable a certain particle decay during the detector simulation?**

A: You can disable/modify a decay by changing its branching ratio. Create a ddsim/npsim steering file with contents like
```python
from DDSim.DD4hepSimulation import DD4hepSimulation
SIM = DD4hepSimulation()
SIM.ui.commandsConfigure = [
    "/particle/select lambda",
    # dump before
    "/particle/property/decay/dump",
    # proton pi-
    "/particle/property/decay/select 0",
    "/particle/property/decay/br 0",
    # neutron pi0
    "/particle/property/decay/select 1",
    "/particle/property/decay/br 1",
    # dump after
    "/particle/property/decay/dump",
]
SIM.ui.commandsInitialize = []
SIM.ui.commandsPostRun = []
SIM.ui.commandsPreRun = []
SIM.ui.commandsTerminate = []
```
and pass it via `--macroFile` option in your ddsim/npsim invocation.

**Q: How do I obtain the generated cross-section for a simulated dataset?**

Information of generated events can be found in the .hepmc3.tree.root files in /work/eic/EPIC/EVGEN. Here is an example on how to print out the cross section stored in the ROOT tree:
```
root -l -b -q root://dtn-eic.jlab.org//work/eic2/EPIC/EVGEN/DIS/NC/18x275/minQ2=1/pythia8NCDIS_18x275_minQ2=1_beamEffects_xAngle=-0.025_hiDiv_1.hepmc3.tree.root -e 'hepmc3_tree->Scan("hepmc3_event.attribute_string", "hepmc3_event.attribute_id==0 && hepmc3_event.attribute_name ==\"GenCrossSection\"", "colsize=30", 1, hepmc3_tree->GetEntries()-1)'
```
Or: 
```
TFile* file = TFile::Open("root://dtn-eic.jlab.org//work/eic2/EPIC/EVGEN/DIS/NC/18x275/minQ2=1/pythia8NCDIS_18x275_minQ2=1_beamEffects_xAngle=-0.025_hiDiv_1.hepmc3.tree.root");

TTreeReader tree_reader("hepmc3_tree", file);
tree->Scan("hepmc3_event.attribute_string", "hepmc3_event.attribute_id==0 && hepmc3_event.attribute_name ==\"GenCrossSection\"", "colsize=30", 1, tree->GetEntries()-1);
```
The “1” at the end of the file name indicates that these events are used in work/eic2/EPIC/RECO/24.06.0/epic_craterlake/DIS/NC/18x275/minQ2=1/pythia8NCDIS_18x275_minQ2=1_beamEffects_xAngle=-0.025_hiDiv_1.xxxx.hepmc3.tree.root

**Q: How do I make new python packages available in eic-shell container environment?** 

A user might need to add a new python package or update the version of a package available in the eic-shell container. The following steps would be needed:
1) [Create a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) in [github](https://www.github.com/eic). Choose "eic" as the owner when prompted and use an open license as shown [here](https://github.com/eic/eic_rucio_policy_package/blob/main/LICENSE). For example: [eic_rucio_policy_package](https://github.com/eic/eic_rucio_policy_package)
2) Create an automated workflow to make PyPi releases with tagged github releases of the form ```v*.*.*```. Need to create a [project.toml](https://github.com/eic/eic_rucio_policy_package/blob/main/pyproject.toml) file and a github [actions.yml](https://github.com/eic/eic_rucio_policy_package/blob/main/.github/workflows/pypi-publish.yml). N.B. If using a different format for version tagging, make sure to update the above files accordingly.  
3) When you [tag a new release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) in github, the workflow on completion will create a PyPi release. Get the SHA256 hash of the latest release of the package. For example: [eic_rucio_policy_package-0.0.5](https://pypi.org/project/eic-rucio-policy-package/#eic_rucio_policy_package-0.0.5.tar.gz). Create or modify the [package.py](https://github.com/eic/eic-spack/blob/develop/packages/py-eic-rucio-policy-package/package.py) in eic-spack to the append the repository information and latest version information.
4) Now grab the [latest commit hash](https://github.com/eic/eic-spack/commits/develop/) in eic-spack and update the eic-container repo as shown [here](https://eicweb.phy.anl.gov/containers/eic_container/-/merge_requests/1073).

Once the all the above changes are merged, the package with the latest version should be available after the next possible nightly relase of eic-shell. 
