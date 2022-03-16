import React, {useEffect, useRef, useState} from "react";
import useAxios from "./useAxios";
import axios from "axios";

// emoji test
const EmojiTest = () => {
    // const { loading, data, error, reFetch } = useAxios({ url: "http://192.168.0.13:8080/aws/ses/template/info/userWelcome" });

    const [search, setSearch] = useState("\\");
    const [data, setData] = useState("");
    const container = useRef(null);
    async function fetchData() {
        const response = await axios.get("http://192.168.0.13:8080/aws/ses/template/info/userWelcome")
        setData(response.data.data.htmlPart);
    }

    function setHtml() {
        let htmlSource = data;

        let emoji = new RegExp("uD83D", "gi");
        htmlSource.replace(emoji,"");
        console.log(htmlSource.includes("uD83D"))
        console.log(htmlSource.replace(emoji,"!!"))

        // if (htmlSource.includes(emojiString)) {
        //     console.log("???")
        // }


        // let emojiString = htmlSource.substr(4550, 12);
        // console.log(emojiString)
        // let regexAll = new RegExp("\uD83D\uDC9C", "g");
        // console.log(regexAll);
        return {
            __html: htmlSource,
        };
    }

    function findEmoji () {

        // console.log(container.current.querySelector(".stb-text-box"))
    }
    findEmoji()

    function interpret(str) {
        return eval("(function(){ return '" + str + "'})()");
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <div ref={container} dangerouslySetInnerHTML={setHtml()}>
            </div>
        </div>
    );
}

export default EmojiTest;