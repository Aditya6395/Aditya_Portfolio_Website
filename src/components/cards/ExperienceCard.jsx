import React from "react";
import styled, { useTheme, keyframes, css } from "styled-components";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const AnimatedContent = styled.div`
  ${({ isEven, index }) => css`
    animation: ${isEven ? fadeInLeft : fadeInRight} 0.6s ease-out forwards;
    animation-delay: ${(index || 0) * 0.2}s;
    opacity: 0;
  `}
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  max-width: 100%;
  gap: 12px;
`;

const Image = styled.img`
  height: 50px;
  border-radius: 10px;
  margin-top: 4px;

  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Role = styled.div`
  font-size: 18px;
  font-weight: 600px;
  color: ${({ theme }) => theme.text_primary + 99};

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Company = styled.div`
  font-size: 14px;
  font-weight: 500px;
  color: ${({ theme }) => theme.text_secondary + 99};

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400px;
  color: ${({ theme }) => theme.text_secondary + 80};

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  margin-bottom: 10px;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Span = styled.div`
  display: -webkit-box;
  max-width: 100%;
`;

const Skills = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  margin-top: -10px;
`;
const Skill = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ExperienceCard = ({ experience, index }) => {
  const theme = useTheme();
  const isLight = theme.bg === "#FFFFFF";
  const isEven = (index || 0) % 2 === 0;
  
  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={experience.company || experience.school}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          src={experience.img}
        />
      }
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(17, 25, 40, 0.83)",
        color: theme.text_primary,
        boxShadow: isLight 
          ? "0px 4px 24px rgba(0, 0, 0, 0.1)" 
          : "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        backgroundColor: isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(17, 25, 40, 0.83)",
        border: isLight 
          ? "1px solid rgba(0, 0, 0, 0.1)" 
          : "1px solid rgba(255, 255, 255, 0.125)",
        borderRadius: "6px",
      }}
      contentArrowStyle={{
        borderRight: isLight 
          ? "7px solid rgba(0, 0, 0, 0.1)" 
          : "7px solid rgba(255, 255, 255, 0.3)",
      }}
      date={experience.date}
    >
      <AnimatedContent isEven={isEven} index={index}>
        <Top>
          <Image src={experience.img} />
          <Body>
            <Role>{experience.role}</Role>
            <Company>{experience.company}</Company>
            <Date>{experience.date}</Date>
          </Body>
        </Top>
        <Description>
          {experience?.desc && <Span>{experience?.desc}</Span>}
          {experience?.skills && (
            <>
              <br />
              <Skills>
                <b>Skills:</b>
                <ItemWrapper>
                  {experience?.skills?.map((skill, index) => (
                    <Skill key={`skill-${index}`}>• {skill}</Skill>
                  ))}
                </ItemWrapper>
              </Skills>
            </>
          )}
        </Description>
      </AnimatedContent>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
