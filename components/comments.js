import { Fragment } from "react"

const Comments = () => {
    return (
        <Fragment>
            <div className="comment-row">
                <div className="comment-left">
                    <img src="/images/audience.png" alt="audience" />
                </div>
                <div className="comment-right">
                    <p className="comments">Lorem Ipsum is simply dummy text.😍</p>
                    <div className="comment-time">21/06/2022 01:35pm</div>
                </div>
            </div>
            <div className="comment-row">
                <div className="comment-left">
                    <img src="/images/audience.png" alt="audience" />
                </div>
                <div className="comment-right">
                    <p className="comments">😍</p>
                    <div className="comment-time">21/06/2022 01:35pm</div>
                </div>
            </div>
        </Fragment>
    )
}

export default Comments