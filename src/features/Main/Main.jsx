import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

import "./Main.scss";

import { db, auth } from "../../app/firebase";
import {MessageSelector, updateMessages} from "../Messages/MessagesSlice";

import MessageList from "../Messages/MessageList/MessageList.jsx";
import MessageAdding from "../Messages/MessageAdding/MessageAdding";

export default function Main() {

    const dispatch = useDispatch();
    const messages = useSelector(MessageSelector);
    // const currentUser = useSelector(CurrentUserSelector);
    useEffect(() =>{
        //This is how to get info from firebase
          db.collection("messages").onSnapshot(snapshot => {
            dispatch(updateMessages( snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
          })
      }, [])

    return (
        <div className="Main">
            <MessageList messages={messages} />
            <button onClick={() => auth.signOut()}>LogOut</button>
            <MessageAdding />
        </div>
    )
}