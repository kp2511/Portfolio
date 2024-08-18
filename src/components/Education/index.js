
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { education, experiences } from '../../utils/constants';
import EducationCard from '../Cards/EducationCard';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 0px 0px 60px 0px;
    @media (max-width: 960px) {
        padding: 0px;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 40px 0px 0px 0px;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
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

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin: 12px 16px 0px 16px;
        font-size: 16px;
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
    @media (max-width: 660px) {
        width: 90%;
        align-items: end;
    }
`;

const TimelineItemWrapper = styled.div`
  opacity: 0;
  filter: blur(5px);
  transform: translateX(100px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  @media (min-width: 768px) {
    transform: translateX(100%);
  }
  &.show {
    filter: blur(0); 
    opacity: 1;
    transform: translateX(0);
  }
`;


const Education = () => {
    const [visibleItems, setVisibleItems] = useState({});
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = entry.target.getAttribute('data-index');
                        setVisibleItems((prevState) => ({
                            ...prevState,
                            [index]: true,
                        }));
                        observer.unobserve(entry.target); // Stop observing once animated
                    }
                });
            },
            {
                rootMargin: "0px",
                threshold: 0.2, // Adjust as needed for when to trigger animation
            }
        );

        const currentRefs = refs.current;
        currentRefs.forEach((ref) => {
            if (ref) {
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
    }, []);

    return (
        <Container id="education">
            <Wrapper>
                <Title>Education</Title>
                <Desc>
                    My education has been a journey of self-discovery and growth. My educational details are as follows.
                </Desc>
                <TimelineSection>
                    <Timeline>
                        {education.map((education, index) => (
                            <TimelineItemWrapper
                                key={index}
                                ref={(el) => (refs.current[index] = el)}
                                data-index={index}
                                className={visibleItems[index] ? 'show' : ''}
                                style={{ transitionDelay: `${index * 0.2}s` }} // Delay animation for sequential effect
                            >
                                <TimelineItem
                                >
                                    <TimelineContent  >
                                        <EducationCard education={education} />
                                    </TimelineContent>
                                    <TimelineSeparator>
                                        <TimelineDot variant="outlined" color="secondary" />
                                        {index !== experiences.length && <TimelineConnector style={{ background: '#854CE6' }} />}
                                    </TimelineSeparator>
                                </TimelineItem>
                            </TimelineItemWrapper>
                        ))}
                    </Timeline>

                </TimelineSection>
            </Wrapper>
        </Container>
    )
}

export default Education;