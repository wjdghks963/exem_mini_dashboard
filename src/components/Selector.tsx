import React, {useState} from "react";
import styled, { keyframes} from "styled-components";

interface SelectorProps<T>{
    state:T
    setState:React.Dispatch<React.SetStateAction<T>>
    options:{key:string, value:any}[]
}

export function Selector({state, setState, options}: SelectorProps<any>) {
    // option에 value값과 state가 같다면 현재 선택 옵션으로 표현하고 만약 아니라면 "선택해주세요"를 나타낸다.
    const findStateIsInOption: {key: string, value: any} | undefined =  options.find(option => option.value === state)
    const isStateFind:string = findStateIsInOption ? options.find(option => option.value === state)!.key.toString() : "선택해주세요"

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedState, setSelectedState] = useState<string>(isStateFind)


    const handleOptionClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        let {textContent} = event.currentTarget
        const content = textContent ? textContent : selectedState;

        setState(event.currentTarget.id)
        setSelectedState(content)
        setIsOpen(false);
    };

    const handleToggleClick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <Wrapper>
       <StateAndIconContainer onClick={handleToggleClick}>
           <DisplayState>{selectedState}</DisplayState>
           <IconContainer >
               {isOpen ? (
                   <OpenIcon>
                       <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path>
                       </svg>
                   </OpenIcon>
               ) : (
                   <CloseIcon>
                       <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                       </svg>
                   </CloseIcon>
               )}
           </IconContainer>
       </StateAndIconContainer>


                <List isOpen={isOpen} >
                    {options.map((option, index) => (
                        <LlItem key={index} id={option.value} onClick={(event) => handleOptionClick(event)}>
                            {option.key}
                        </LlItem>
                    ))}
                </List>
        </Wrapper>
    );



}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin: auto;
  position: relative;
`;

const StateAndIconContainer = styled.div`
  display: flex;
  position: relative;
  border: 2px black solid;
  width: 100%;
  padding: 20px 0;
`

const DisplayState = styled.span`
  margin: auto;
`

const IconContainer = styled.div`
    display: flex;
    justify-content: end;
`
const List = styled.ul<{isOpen: boolean}>`
  position: absolute;
  top: 100%;
  list-style: none;
  width: 100%;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  animation: ${({isOpen}) => (isOpen ? slideDownAnim : slideUpAnim)} 0.3s ease-in-out forwards;

  
  li:first-child{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  li:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const LlItem = styled.li`
  cursor: pointer;
  padding: 10px;
 background: white; 
`

const Icon = styled.span`
  display: block;
  position: absolute;
  width: 30px;
  right: 0;
  bottom: 15%;
`;



const OpenIcon = styled(Icon)``;

const CloseIcon = styled(Icon)``;



const slideDownAnim = keyframes`
  from {
    transform: scaleY(0);
    transform-origin: top;
    display: block;
  }

  to {
    transform: scaleY(1);
    transform-origin: top;
  }
`;

const slideUpAnim = keyframes`
  from {
    transform: scaleY(1);
    transform-origin: top;
  }

  to {
    transform: scaleY(0);
    transform-origin: top;
    display: none;
  }
`;