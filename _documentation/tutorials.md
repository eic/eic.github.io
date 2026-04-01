---
title: ePIC Tutorials
description: epicTutorials
name: tutorials
layout: default
tutorials:

  - title: "Setting up an environment"
    url: "https://eic.github.io/tutorial-setting-up-environment"
    summary: "Get started with the ePIC software environment and the core tools used throughout the tutorial series."
    image: "/assets/images/tutorials/SetupEnvSS.png"
    resources:
      - label: "Video 1"
        url: "https://www.youtube.com/watch?v=Y0Mg24XLomY"
        kind: "youtube"
      - label: "Video 2"
        url: "https://www.youtube.com/watch?v=5HmzFnYW4W4"
        kind: "youtube"

  - title: "Analysis and simulation output"
    url: "https://eic.github.io/tutorial-analysis"
    summary: "Learn how to inspect simulation output and build analysis workflows around the produced data."
    image: "/assets/images/tutorials/AnaTutSS.png"
    resources:
      - label: "Video 1"
        url: "https://youtu.be/O7lPhc7Z3bM"
        kind: "youtube"
      - label: "Video 2"
        url: "https://youtu.be/oI8i5PctZX4"
        kind: "youtube"

  - title: "Simulating detectors"
    url: "https://eic.github.io/tutorial-geometry-development-using-dd4hep/"
    summary: "Development of detector geometry using DD4hep, from core concepts to practical detector simulation work."
    image: "/assets/images/tutorials/GeoDevSS.png"
    resources:
      - label: "Video"
        url: "https://youtu.be/k9Egs602GuM"
        kind: "youtube"

  - title: "Modifying geometry and digitization"
    url: "https://eic.github.io/tutorial-modifying-geometry-digitization-etc"
    summary: "Learn how to customize detector geometry, digitization, and related detector configuration details."
    image: "/assets/images/tutorials/ModGeoTutSS.png"

  - title: "Understanding simulation output"
    url: "https://eic.github.io/tutorial-understanding-sim-output"
    summary: "Take a deeper look at the structure of simulation output and how to interpret the information it contains."
    image: "/assets/images/tutorials/UnderSimOutTutSS.png"
    resources:
      - label: "Video"
        url: "https://youtu.be/ENx4J47ij9Y"
        kind: "youtube"

  - title: "Getting started with physics analysis"
    url: "https://indico.bnl.gov/event/27123/"
    summary: "Physics analysis introduction with workshop material and a linked recording for a guided walkthrough."
    image: "/assets/images/tutorials/AnalysisThumbVid.png"
    resources:
      - label: "Video"
        url: "https://youtu.be/goONxXudL-s"
        kind: "youtube"

  - title: "Inclusive kinematics reconstruction"
    url: "https://eic.github.io/tutorial-kinematic-reconstruction/"
    summary: "Work through inclusive kinematics reconstruction techniques and the assumptions behind the main methods."
    image: "/assets/images/tutorials/InclusiveKinRecTutSS.png"
    resources:
      - label: "Video"
        url: "https://youtu.be/gdU5MXGy9xg"
        kind: "youtube"

  - title: "Reconstruction algorithms"
    url: "https://eic.github.io/tutorial-reconstruction-algorithms"
    summary: "Study the reconstruction algorithms used in ePIC and compare the ideas behind different approaches."
    image: "/assets/images/tutorials/ReconAlgTutSS.png"
    resources:
      - label: "Video 1"
        url: "https://youtu.be/Fjs8pyS47_A"
        kind: "youtube"
      - label: "Video 2"
        url: "https://youtu.be/WkePQZZVufc"
        kind: "youtube"

  - title: "Developing benchmarks"
    url: "https://eic.github.io/tutorial-developing-benchmarks"
    summary: "Learn how to design and evaluate benchmarks for performance studies and software validation."
    image: "/assets/images/tutorials/BenchmarkTutSS.png"

  - title: "Simulations with npsim and geant4"
    url: "https://eic.github.io/tutorial-simulations-using-npsim-and-geant4/"
    summary: "Run detector simulations with npsim and Geant4 while comparing workflows across frameworks."
    image: "/assets/images/tutorials/SimTutSS.png"
    resources:
      - label: "Video 1"
        url: "https://www.youtube.com/watch?v=QjjD1_wjLIw"
        kind: "youtube"
      - label: "Video 2"
        url: "https://www.youtube.com/watch?v=WqSQ4m_esUw"
        kind: "youtube"

  - title: "Reconstruction framework"
    url: "https://eic.github.io/tutorial-jana2/"
    summary: "Explore the JANA2-based reconstruction framework and the building blocks used in the ePIC workflow."
    image: "/assets/images/tutorials/ReconTutSS.png"
    resources:
      - label: "Video 1"
        url: "https://www.youtube.com/watch?v=Ly2Zh1AGUEc"
        kind: "youtube"
      - label: "Video 2"
        url: "https://youtu.be/9blKFZS-qMk"
        kind: "youtube"

  - title: "Analysis bootcamp"
    url: "https://github.com/eic/python-analysis-bootcamp"
    summary: "Python-based analysis techniques collected in a bootcamp format for hands-on learning."
    image: "/assets/images/tutorials/AnaBootcampSS.png"
---

<div class="tutorials-landing">
  <section class="tutorials-hero">
    <p class="tutorials-eyebrow">Training Center</p>
    <h2 class="tutorials-hero-title">Browse the current ePIC tutorial collection.</h2>
  </section>

  <div class="tutorials-grid">
    {% for tutorial in page.tutorials %}
      <article class="tutorial-card">
        <a class="tutorial-card-media" href="{{ tutorial.url }}">
          <img src="{{ tutorial.image | relative_url }}" alt="{{ tutorial.title }} preview" loading="lazy">
        </a>

        <div class="tutorial-card-body">
          <h3 class="tutorial-card-title">
            <a href="{{ tutorial.url }}">{{ tutorial.title }}</a>
          </h3>

          <p class="tutorial-card-summary">{{ tutorial.summary }}</p>

          {% if tutorial.resources and tutorial.resources.size > 0 %}
            <div class="tutorial-resource-list">
              {% for resource in tutorial.resources %}
                <div class="tutorial-resource-item">
                  <a class="tutorial-resource-link tutorial-resource-link--{{ resource.kind | default: 'link' }}" href="{{ resource.url }}" target="_blank" rel="noopener noreferrer">
                    {% if resource.kind == "youtube" %}
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M23.5 6.19a3 3 0 0 0-2.11-2.12C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.39.57A3 3 0 0 0 .5 6.19 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.81 3 3 0 0 0 2.11 2.12c1.86.57 9.39.57 9.39.57s7.53 0 9.39-.57a3 3 0 0 0 2.11-2.12A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.81ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z"></path>
                      </svg>
                    {% else %}
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M14 3h7v7h-2V6.41l-8.29 8.3-1.42-1.42 8.3-8.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"></path>
                      </svg>
                    {% endif %}
                    <span>{{ resource.label }}</span>
                  </a>
                </div>
              {% endfor %}
            </div>
          {% endif %}

          <div class="tutorial-card-links">
            <a class="tutorial-open-link" href="{{ tutorial.url }}">Open tutorial</a>
          </div>
        </div>
      </article>
    {% endfor %}
  </div>

  <section class="tutorials-note">
    Please join the <a href="https://chat.epic-eic.org/main/channels/software-tutorials">Mattermost Software Tutorials</a>
    channel for updates, announcements, and questions about tutorials.
  </section>
</div>
