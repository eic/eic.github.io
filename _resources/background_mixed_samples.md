---
title: Understanding production samples containing signals mixed with backgrounds
description: background_mixed_samples
name: background_mixed_samples
layout: default
---

{% include layouts/title.md %}


---
# Case 1: At least 1 Signal in Every Event of a Run

A run is a collection of events and each event represents a 2000 nano second long integration frame. 

## Representation of a "Run" with 5 "Events"
If we assume a signal frequency of 500 kHz, each event contains atleast 1 signal contribution. The background contributions get allocated per event based on their sampling frequency. Processes with less than 500 kHz sampling frequency are not guaranteed a contribution in every event. 

| **Event**   | **signal**   | **synrad** | **ebrems** | **etouschek** | **ecoloumb** | **p.b.gas**|
| ----------- | -----------  | -----------| ---------  | ------------  | -----------  | -----------  | 
| **Event 1** | 🔴           | ⚪⚪⚪⚪ | 🔵      |               |              |            |
| **Event 2** | 🔴           | ⚪⚪⚪⚪ |         |               | 🟡           |  🟣          | 
| **Event 3** | 🔴           | ⚪⚪⚪   |       |     🟢        |              |            |
| **Event 4** | 🔴           | ⚪⚪⚪    | 🔵        |               |               |  🟣          | 
| **Event 5** | 🔴           | ⚪⚪⚪ ⚪   | 🔵      |               |               |            | 

## Legend

| Symbol | Process | Description | Sampling Frequency (kHz) | Status Code Shift |
|--------|---------|-------------| ------------------| --------------------- |
| 🔴 | **signal** | DIS NC 18x275 Q²>1 (Deep inelastic scattering neutral current) | 500 | 0
| ⚪ | **synrad**  | Synchrotron Radiation  | 14000 | 2000
| 🔵 | **ebrems** | Electron bremsstrahlung radiation | 316.94 | 3000
| 🟢 | **etouschek** | Touschek scattering (intrabeam scattering) | 1.3 | 4000
| 🟡 | **ecoulomb** | Coulomb scattering processes | 0.72 | 5000
| 🟣 | **p.b.gas** | Proton beam gas interactions | 22.5 | 6000

## Location of files

**Simulation Output** 

```
root://dtn-eic.jlab.org//volatile/eic/EPIC/FULL/25.06.1/epic_craterlake/Bkg_1SignalPer2usFrame/Synrad_18GeV_Vac_10000Ahr_Runtime_10ms_Egas_All_18GeV_Hgas_275GeV/DIS/NC/18x275/minQ2=1/
```

**Reconstructed Output**

```
root://dtn-eic.jlab.org//volatile/eic/EPIC/RECO/25.06.1/epic_craterlake/Bkg_1SignalPer2usFrame/Synrad_18GeV_Vac_10000Ahr_Runtime_10ms_Egas_All_18GeV_Hgas_275GeV/DIS/NC/18x275/minQ2=1/
```

N.B.: Increment the campaign tag (25.06.1) to get the latest campaigns. Reconstructed output is available for every campaign but simulation output is not always preserved to save storage resources.

---


---
# Case 2: Realistic Signal Contribution Per Event of a Run

A run is a collection of events and each event represents a 2000 nano second long integration frame. For the SIDIS pythia6 18x275 Q²<1, the signal frequency is 83 kHz which would result in 1 signal contribution every ~5 events.

## Representation of a "Run" with 5 "Events"

| **Event**   | **signal**   | **synrad** | **ebrems** | **etouschek** | **ecoloumb** | **p.b.gas**|
| ----------- | -----------  | -----------| ---------  | ------------  | -----------  | -----------  | 
| **Event 1** |            | ⚪⚪⚪⚪ | 🔵      |               |              |            |
| **Event 2** |            | ⚪⚪⚪⚪ |         |               | 🟡           |  🟣          | 
| **Event 3** | 🔴           | ⚪⚪⚪   |       |     🟢        |              |            |
| **Event 4** |            | ⚪⚪⚪    | 🔵        |               |               |  🟣          | 
| **Event 5** |            | ⚪⚪⚪ ⚪   | 🔵      |               |               |            | 

## Legend

| Symbol | Process | Description | Sampling Frequency (kHz) | Status Code Shift |
|--------|---------|-------------| ------------------| --------------------- |
| 🔴 | **signal** | SIDIS pythia6 18x275 Q²<1 (Deep inelastic scattering neutral current)  | 500 | 0
| ⚪ | **synrad**  | Synchrotron Radiation  | 14000 | 2000
| 🔵 | **ebrems** | Electron bremsstrahlung radiation | 316.94 | 3000
| 🟢 | **etouschek** | Touschek scattering (intrabeam scattering) | 1.3 | 4000
| 🟡 | **ecoulomb** | Coulomb scattering processes | 0.72 | 5000
| 🟣 | **p.b.gas** | Proton beam gas interactions | 22.5 | 6000

## Location of files

**Simulation Output** 

```
root://dtn-eic.jlab.org//volatile/eic/EPIC/FULL/25.06.1/epic_craterlake/Bkg_RealisticSignalPer2usFrame/Synrad_18GeV_Vac_10000Ahr_Runtime_10ms_Egas_All_18GeV_Hgas_275GeV/SIDIS/pythia6-eic/1.0.0/18x275/q2_0to1
```

**Reconstructed Output**

```
root://dtn-eic.jlab.org//volatile/eic/EPIC/RECO/25.06.1/epic_craterlake/Bkg_RealisticSignalPer2usFrame/Synrad_18GeV_Vac_10000Ahr_Runtime_10ms_Egas_All_18GeV_Hgas_275GeV/SIDIS/pythia6-eic/1.0.0/18x275/q2_0to1
```

N.B.: Increment the campaign tag (25.06.1) to get the latest campaigns. Reconstructed output is available for every campaign but simulation output is not always preserved to save storage resources.

---


---
# Case 3: Only Background Contributions Per Event of a Run

A run is a collection of events and each event represents a 2000 nano second long integration frame. There are no signal contributions in any of the events.

## Representation of a "Run" with 5 "Events"

| **Event**   | **signal**   | **synrad** | **ebrems** | **etouschek** | **ecoloumb** | **p.b.gas**|
| ----------- | -----------  | -----------| ---------  | ------------  | -----------  | -----------  | 
| **Event 1** |            | ⚪⚪⚪⚪ | 🔵      |               |              |            |
| **Event 2** |            | ⚪⚪⚪⚪ |         |               | 🟡           |  🟣          | 
| **Event 3** |           | ⚪⚪⚪   |       |     🟢        |              |            |
| **Event 4** |            | ⚪⚪⚪    | 🔵        |               |               |  🟣          | 
| **Event 5** |            | ⚪⚪⚪ ⚪   | 🔵      |               |               |            | 

## Legend

| Symbol | Process | Description | Sampling Frequency (kHz) | Status Code Shift |
|--------|---------|-------------| ------------------| --------------------- |
| ⚪ | **synrad**  | Synchrotron Radiation  | 14000 | 2000
| 🔵 | **ebrems** | Electron bremsstrahlung radiation | 316.94 | 3000
| 🟢 | **etouschek** | Touschek scattering (intrabeam scattering) | 1.3 | 4000
| 🟡 | **ecoulomb** | Coulomb scattering processes | 0.72 | 5000
| 🟣 | **p.b.gas** | Proton beam gas interactions | 22.5 | 6000


## Location of files

**Simulation Output** 

```
root://dtn-eic.jlab.org//volatile/eic/EPIC/FULL/25.06.1/epic_craterlake/Bkg_OnlyPer2usFrame/Synrad_18GeV_Vac_10000Ahr_Runtime_10ms_Egas_All_18GeV_Hgas_275GeV/BACKGROUNDS/BEAMGAS/proton/pythia8.306-1.0/275GeV
```

**Reconstructed Output**

```
root://dtn-eic.jlab.org//volatile/eic/EPIC/RECO/25.06.1/epic_craterlake/Bkg_OnlyPer2usFrame/Synrad_18GeV_Vac_10000Ahr_Runtime_10ms_Egas_All_18GeV_Hgas_275GeV/BACKGROUNDS/BEAMGAS/proton/pythia8.306-1.0/275GeV

```

N.B.: Increment the campaign tag (25.06.1) to get the latest campaigns. Reconstructed output is available for every campaign but simulation output is not always preserved to save storage resources.

---


# Analyzing the output

It's possible to separate the contribution from signal and background sources that are simulated by using cuts on the [status codes](https://arxiv.org/pdf/1912.08005.pdf) which are represented by the MCParticles.generatorStatus in the edm4hep output file.

| Status code | Meaning                     | Usage                             |
|-------------|-----------------------------|----------------------------------|
| 0           | Not defined (null entry)     | Not a meaningful status           |
| 1           | Undecayed physical particle | Recommended for all cases         |
| 2           | Decayed physical particle   | Recommended for all cases         |
| 3           | Documentation line          | Often used to indicate in/out particles in hard process |
| 4           | Incoming beam particle      | Recommended for all cases         |
| 5–10        | Reserved for future standards | Should not be used              |
| 11–200      | Generator-dependent         | For generator usage               |
| 201–        | Simulation-dependent        | For simulation software usage    |

N.B.: By default, DD4hep takes primary particles (status code 1, 2) 
and also custom status code provided with

```
--physics.alternativeStableStatuses="1001 2001 …" --physics.alternativeDecayStatuses="xxxx yyy  "
```

**Example: Minimal ROOT script to view counts of processes by status codes**

```
TChain *T=new TChain("events");
T->Add("root://dtn-eic.jlab.org//volatile/eic/EPIC/RECO/25.06.1/epic_craterlake/Bkg_1SignalPer2usFrame/Synrad_18GeV_Vac_10000Ahr_Runtime_10ms_Egas_All_18GeV_Hgas_275GeV/DIS/NC/18x275/minQ2=1/*010*");
T->Draw("MCParticles.generatorStatus", "MCParticles.generatorStatus>0");
gPad->SetLogy();
```
<img width="488" height="402" alt="image" src="https://github.com/user-attachments/assets/040ccb77-e18c-4311-9a71-9a9a8ee2646a" />



**Example: Charged Primary Particle Distribution in Eta**

<img width="488" height="402" alt="image" src="https://github.com/user-attachments/assets/cd439c91-38b4-4df8-adfe-aa1f2ae66a61" />





