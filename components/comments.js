import { Fragment, useEffect } from "react"

const Comments = ({ chat, scrollChatMiddle }) => {
    useEffect(() => {
        scrollChatMiddle();
    }, [chat])
    return (
        <Fragment>
            <div className="comment-row">
                <div className="comment-left">
                    <img src="/images/audience.png" alt="audience" />
                </div>
                <div className="comment-right">
                    <p className="comments">{chat && chat.Message}</p>
                    <div className="comment-time">{chat && chat.DateTime}</div>
                </div>
            </div>
        </Fragment>
    )
}

export default Comments