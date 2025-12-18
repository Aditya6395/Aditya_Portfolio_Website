import React from "react";
import styled, { keyframes } from "styled-components";
import { skills } from "../../data/constants";
import { Tilt } from "react-tilt";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content-center;
position: relative;
z-index: 1;
align-items: center;
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
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
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 50px;
  justify-content: center;
  padding: 0 16px;
  
  @media (max-width: 768px) {
    gap: 30px;
    padding: 0 12px;
  }
  
  @media (max-width: 480px) {
    gap: 20px;
    padding: 0 8px;
  }
`;
const Skill = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(255, 255, 255, 0.95)" 
    : "rgba(17, 25, 40, 0.83)"};
  border: 1px solid ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "rgba(0, 0, 0, 0.1)" 
    : "rgba(255, 255, 255, 0.125)"};
  box-shadow: ${({ theme }) => theme.bg === "#FFFFFF" 
    ? "0px 4px 24px rgba(0, 0, 0, 0.1)" 
    : "rgba(23, 92, 230, 0.15) 0px 4px 24px"};
  border-radius: 16px;
  padding: 18px 36px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  opacity: 0;
  animation-delay: ${({ index }) => (index || 0) * 0.15}s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.bg === "#FFFFFF" 
      ? "0px 8px 32px rgba(0, 0, 0, 0.15)" 
      : "rgba(23, 92, 230, 0.25) 0px 8px 32px"};
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 16px 24px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 14px 20px;
    border-radius: 12px;
  }
`;

const SkillTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;
const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 80};
  border: 1px solid ${({ theme }) => theme.text_primary + 80};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
    gap: 6px;
  }
`;

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Skills = () => {
  return (
    <Container id="Skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
          Here are some of my skills on which I have been working on for the
          past 1 years.
        </Desc>

        <SkillsContainer>
          {skills.map((skill, index) => (
            <Tilt key={`skill-${index}`}>
              <Skill index={index}>
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillList>
                  {skill.skills.map((item, index_x) => (
                    <SkillItem key={`skill-x-${index_x}`}>
                      <SkillImage src={item.image} alt={item.name} />
                      {item.name}
                    </SkillItem>
                  ))}
                </SkillList>
              </Skill>
            </Tilt>
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
