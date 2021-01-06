import React, { useState } from 'react';
import Game from '../Game/Game'
import {Chat} from '../Chatroom/Chat/chat'
export default function ScreenGame(props) {
    return(
    <div>
        <Game roomInfo={props.roomInfo}/>
        <Chat roomInfo={props.roomInfo}/>
    </div>
    )
}