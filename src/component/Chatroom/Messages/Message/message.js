import React from 'react';

import ReactEmoji from 'react-emoji'

import './message.css';

export const Message = ({message: { user, text }, name}) => {
    let isSentByCurrentUser = false;
    
    const trimmedName = name.trim();
    const nameCompare = trimmedName.slice(3, name.length-3);
    console.log("trimmedName: "+nameCompare);
    console.log("user: "+user);

    if(user === nameCompare) {
        isSentByCurrentUser = true
    }

    return (
    isSentByCurrentUser
    ? (
        <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{nameCompare}</p>
            <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
            </div>
        </div>
    )
    : (
        <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{text}</p>
            </div>
            <p className="sentText pl-10">{user}</p>
        </div>
    ) 
    )

};