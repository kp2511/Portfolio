
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/ExperienceCard';
import { experiences } from '../../utils/constants';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 40px 0px 80px 0px;
  transition: all 1.5s;
  .hidden {
    opacity: 0.5;
    filter: blur(5px);
    transform: translateX(-100%);
    transition: transform 1.2s ease-out;
  }
  @media (max-width: 960px) {
    padding: 0px;
    padding-top: 80px;
    padding-bottom: 80px;
  }
  p {
    background-color: lightgrey;
    padding: 1rem;
    border-radius: 1rem;
    min-height: 70vh;
    display: grid;
    place-items: center;
    font-family: sans-serif;
    margin-bottom: 1rem;
  }
  p:first-of-type {
    min-height: 100vh;
  }
  .show {
    opacity: 1;
    filter: blur(0); 
    transform: translateX(0);
    transition: transform 0.8s ease-out;
  }
  .wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 80px 0;
    gap: 12px;
    @media (max-width: 960px) {
      flex-direction: column;
    }
  }
`;

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const TimelineSection = styled.div`
    width: 100%;
    max-width: 1000px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;



const Index = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    sessionStorage.removeItem('hasTransitioned');
  },[]);

  useEffect(() => {
    const hasTransitioned = sessionStorage.getItem('hasTransitioned');
    if (!hasTransitioned) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
          if (entry.isIntersecting) {
            sessionStorage.setItem('hasTransitioned', 'true');
          }
        },
        { rootMargin: "-300px" }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    } else {
      setIsIntersecting(true);
    }
  }, [isIntersecting]);

  
  return (
    <Container id="experience">
      <div
        ref={ref}
        className={`${isIntersecting ? 'show' : 'hidden'}`}
      >
        <Title>Experience</Title>
        <TimelineSection>
          <Timeline>
            {experiences.map((experience, index) => (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  {index !== experiences.length - 1 && <TimelineConnector style={{ background: '#854CE6' }} />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <ExperienceCard experience={experience} />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineSection>
      </div>
    </Container>
  )
}

export default Index;