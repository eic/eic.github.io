---
title: FAQ
description: FAQ
name: faq
layout: default
---

{% include layouts/title.md %}

Welcome to the **Frequently Asked Questions** page!
Please use the [Helpdesk](https://eic.cloud.mattermost.com/main/channels/helpdesk) on Mattermost

Submit new questions and comments by email: [![emailicon](../assets/images/site/icons/email.png){: width="3%" }](mailto:epic-sc-faq-l@lists.bnl.gov)

------------------------

**Q: How can we access simulation files on S3 storage?**

A: See [https://doc.athena-eic.org/en/latest/howto/s3_file_storage.html](https://doc.athena-eic.org/en/latest/howto/s3_file_storage.html)

**Q: How can we locate specific files in S3 and better understand their directory structure?**

A: **TODO:** Ask Prod for 1-2 lines on the directory structure; tutorials cover how to navigate (one can use a web interface as well)

**Q: How can we determine the properties of simulated files, such as parameters, particles, and energies?**

A: **TODO:** Production knows best, but more or less by the file name.

**Q: How can we effectively use the information stored in EICRecon rootfile outputs, such as matching reconstructed particles to their MC particles?**

A: To an extent, this is covered in the [dRICH tutorials](https://github.com/eic/drich-dev/blob/tutorial/doc/tutorials/3-running-reconstruction.md), starting at session 3 and partly covered in existing [recorded tutorials](https://indico.bnl.gov/event/18373/). **TODO:** Probably needs to be supplemented with example codes. 

**Q: How can we apply beam effects, including adjusting the ion beam when using a particle gun?**

A: Beam effects are handled by the [afterburner](https://github.com/eic/afterburner), which expects HepMC3 input. They cannot be simply turned on in just the npsim particle gun. 

**Q: How do we check and change beam magnet settings for both simulation and reconstruction?**

A: **TODO:**Changing magnet configuration in reconstruction makes little sense. Checking and changing it for simulation should be answered by the prod group.

**Q: What are the commands for browsing files on S3 and copying them to local directories?**

**Q: How can we load files into ROOT directly from S3?**

A: Recommended way currently is using the XrootD mirror because it doesn't need a password. See:
```
    auto f = TFile::Open("root://dtn-eic.jlab.org//work/eic2/EPIC/RECO/23.09.1/epic_craterlake/DIS/NC/18x275/minQ2=1000/pythia8NCDIS_18x275_minQ2=1000_beamEffects_xAngle=-0.025_hiDiv_1.0000.eicrecon.tree.edm4eic.root")
```
or, for browsing:
```
    xrdfs root://dtn-eic.jlab.org   
    ls /work/eic2/EPIC/RECO/23.09.1/epic_craterlake/DIS/NC/18x275/minQ2=1000
```
To use S3, you need the minimal step:
```
    export S3_ACCESS_KEY=[ask in mattermost]
    export S3_SECRET_KEY=[ask in mattermost]
    mc config host add S3 https://eics3.sdcc.bnl.gov:9000 $S3_ACCESS_KEY $S3_SECRET_KEY
    auto f = TFile::Open("s3https://eics3.sdcc.bnl.gov:9000/eictest/EPIC/RECO/23.09.1/epic_craterlake/DIS/NC/18x275/minQ2=1000/pythia8NCDIS_18x275_minQ2=1000_beamEffects_xAngle=-0.025_hiDiv_1.0000.eicrecon.tree.edm4eic.root")
```

**Q: What is the best practice for analyzing EICrecon output, especially regarding hadron PID likelihoods?**

A: **TODO:** Needs an updated analysis tutorial. I don't believe at this point we have a simple unified PID likelihood approach.

**Q: How can we develop a benchmark for an analysis code to pass on to the validation software team?**

A: **TODO:** We originally planned a dedicated "Tutorial: Writing physics benchmarks that run automatically and reproducibly" - this needs to be revisited. Otherwise, Dmitry K, Wouter, Sylvester may be able to write up something short. This is a good FAQ candidate really, if we can get this answered.

**Q: What is included in the campaign, and what are the major changes compared to before?**

**Q: How can we access various (SI)DIS variables through different reconstruction methods?**

A: **TODO:** Things like ``InclusiveKinematicsDA.cc`` are part of EicRecon, but I don't know how to use it. I don't believe it's calculated by default during campaigns, so one would still need an analysis level version. Would be good example analysis code, and I'm sure it exists in many forms on various people's laptops.

**Q: How do we match tracks and clusters from the calorimeters?**

**Q: How can we access hadron and electron PID data?**

**Q: How do we navigate from reconstructed to truth information?**

A: Needs a refreshed tutorial; needs example code

**Q: Is there an organized repository or wiki that guides newcomers to the right tutorials and slides?**

A: Yes, but the dRICH one is closest, plus the tutorials indico. **TODO:** Should be combined and front and center of the landing page.

**Q: Are there quick starter-code examples (Analyzer macros) for accessing branch information and creating physics plots?**

A: **TODO:** Yes, but not well organized and more is better.

**Q: Can you provide an example of analyzing EICrecon data using basic methods?**

A: [https://indico.bnl.gov/event/18373/](https://indico.bnl.gov/event/18373/) has some, so does the dRICH tutorial. **TODO:** Needs more example code.

