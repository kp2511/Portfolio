import React, { useEffect, useState, useRef }  from 'react';
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider, ProjectCardWrapper } from './ProjectsStyle';
import ProjectCard from '../Cards/ProjectCards';
import { projects } from '../../utils/constants';

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState('all');
  const [visibleItems, setVisibleItems] = useState({});
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          const index = entry.target.getAttribute('data-index');
          setVisibleItems((prevState) => ({
            ...prevState,
            [index] : true
          }));
          observer.unobserve(entry.target);
        }
      })
    }, {
      rootMargin: "0px",
      threshold: 0.1
    });

    const currentRefs = refs.current;
    currentRefs.forEach((ref) => {
      if(ref) {
        observer.observe(ref);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [])

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. Here are some of them:
        </Desc>
        <ToggleButtonGroup >
          {toggle === 'all' ?
            <ToggleButton active value="all" onClick={() => setToggle('all')}>All</ToggleButton>
            :
            <ToggleButton value="all" onClick={() => setToggle('all')}>All</ToggleButton>
          }
          <Divider />
          {toggle === 'web app' ?
            <ToggleButton active value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
            :
            <ToggleButton value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
          }
          <Divider />
          {toggle === 'android app' ?
            <ToggleButton active value="android app" onClick={() => setToggle('android app')}>ANDROID APP'S</ToggleButton>
            :
            <ToggleButton value="android app" onClick={() => setToggle('android app')}>ANDROID APP'S</ToggleButton>
          }
          <Divider />
          {toggle === 'machine learning' ?
            <ToggleButton active value="machine learning" onClick={() => setToggle('machine learning')}>MACHINE LEARNING/AI</ToggleButton>
            :
            <ToggleButton value="machine learning" onClick={() => setToggle('machine learning')}>MACHINE LEARNING/AI</ToggleButton>
          }
        </ToggleButtonGroup>
        <CardContainer>
          {toggle === 'all' && projects
            .map((project, index) => (
              <ProjectCardWrapper
                key={index}
                ref={(el) => (refs.current[index] = el)}
                data-index={index}
                className={visibleItems[index] ? 'show' : ''}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
              </ProjectCardWrapper>
            ))}
          {projects
            .filter((item) => item.category === toggle)
            .map((project, index) => (
              <ProjectCardWrapper
                key={index}
                ref={(el) => (refs.current[index] = el)}
                data-index={index}
                className={visibleItems[index] ? 'show' : ''}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
              </ProjectCardWrapper>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects