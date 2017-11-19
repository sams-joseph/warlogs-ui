import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledDiv = styled.div`
  display: flex;
`;

const HeadingsContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
  display: block;
  height: 50px;
  margin-right: 20px;
  width: 50px;
  border-radius: 25px;
`;

const Heading = styled.span`
  color: white;
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const SubHeading = styled.span`
  color: white;
  display: block;
  font-size: 12px;
  text-transform: capitalize;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DateHeading = styled.span`
  color: white;
  display: block;
  font-size: 14px;
  font-weight: bold;
  text-align: right;
  margin-bottom: 5px;
`;

const Date = styled.span`
  color: white;
  display: block;
  font-size: 12px;
  text-align: right;
`;

const PlayerHeader = ({
  player, image, career, date,
}) => (
  <Container>
    <StyledDiv>
      <Avatar src={`/images/icons/${image}.png`} alt={career} />
      <HeadingsContainer>
        <Heading>{player}</Heading>
        <SubHeading>{career}</SubHeading>
      </HeadingsContainer>
    </StyledDiv>
    <DateContainer>
      <DateHeading>Created on</DateHeading>
      <Date>{date}</Date>
    </DateContainer>
  </Container>
);

PlayerHeader.propTypes = {
  player: PropTypes.string,
  image: PropTypes.string,
  career: PropTypes.string,
  date: PropTypes.string,
};

export default PlayerHeader;
