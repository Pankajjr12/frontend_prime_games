import React, { useEffect, useRef, useState } from "react";

import { Box, Button, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PromptMessage from "./PromptMessage";
import ResponseMessage from "./ResponseMessage";
import { useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { chatBot } from "../../../state/Customer/chatSlice";

interface ChatBotProps{
    handleClose:(e:any)=>void;
    productId?:number
}

const ChatBot = ({handleClose,productId}:ChatBotProps) => {
    const dispatch = useAppDispatch();
    const [prompt, setPrompt] = useState();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [responses, setResponses] = useState<any>([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const {aiChatBot}=useAppSelector(store=>store);

    const handleGivePrompt = (e:any) => {
        e.stopPropagation();
        console.log("Prompt content: ", prompt); // Log prompt value to see if it's correctly set
        dispatch(chatBot({ prompt: { prompt }, productId, userId: null }));
    };
    
    

    const handlePromptChange = (e: any) => {
        
        setPrompt(e.target.value);
    };
    useEffect(() => {
        console.log("AI Chat Bot Response:", aiChatBot.messages); // Check if response data is here
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [aiChatBot.messages]);
    
    // console.log(aiChatBot)
    return (
        <div className="rounded-lg">
            <div className="w-full lg:w-[40vw] h-[82vh] shadow-2xl bg-white z-50 rounded-lg">
                <div className=" h-[12%] flex justify-between items-center px-5 bg-slate-100 rounded-t-lg">
                    <div className="flex items-center gap-3 ">
                        <h1 className="logo">Prime GameStore</h1>
                        <p>Assitant</p>
                    </div>
                   {/* {productId && <div className="flex items-center gap-3">
                        <p>Product id :</p>
                        <p>{productId}</p>
                    </div>} */}
                    <div>
                        <IconButton 
                        onClick={handleClose}
                        color="primary"
                       
                        >
                            <CloseIcon/>
                        </IconButton>
                    </div>

                </div>

                <div className="h-[78%] p-5 flex flex-col py-5 px-5 overflow-y-auto  custom-scrollbar">

                    <p>welcome to Prime Gamestore Ai Assistant, you can
                      {productId?` Query About this Product : ${productId}`:"   Query about your cart, and order history here"}
                    </p>
                    { aiChatBot.messages.map((item:any, index:number) =>
                        item.role == "user" ? (
                            <div ref={chatContainerRef} className="self-end" key={index}>
                                <PromptMessage message={item.message} index={index} />
                            </div>
                        ) : (
                            <div
                                ref={chatContainerRef}
                                className="self-start"
                                key={index}
                            >
                                <ResponseMessage message={item.message} />
                            </div>
                        )
                    )}
                    {aiChatBot.loading && <p>fetching data...</p>}

                </div>

                <div className=" h-[10%] flex items-center">
                    <input
                        onChange={handlePromptChange}
                        type="text"
                        placeholder="give your prompt"
                        className="rounded-bl-lg pl-5 h-full w-full bg-slate-100 border-none outline-none"
                    />
                    <Button
                        sx={{ borderRadius: "0 0 0.5rem 0" }}
                        className="h-full "
                        onClick={handleGivePrompt}
                        variant="contained"
                    >
                        <SendIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;