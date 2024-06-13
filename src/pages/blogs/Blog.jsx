import React from 'react';
import './Blog.css';
import Image from '../../assets/cover.png';
import {Link} from "react-router-dom";
import {ArrowForward } from '@mui/icons-material';


export const Blog = () => {
    return (
        <div className='container'>
            <div className='post'>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Iusto laudantium odit repellendus necessitatibus eos doloribus. 
                    Ab, maiores saepe, sint dolor reiciendis debitis esse odit eos quaerat minima ipsum veritatis ex?
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Veniam iusto, esse dignissimos unde accusantium quasi reiciendis
                     consequatur impedit nulla corporis cum excepturi, 
                    iure aliquam harum dolor quaerat, dolorum omnis id.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Iusto laudantium odit repellendus necessitatibus eos doloribus. 
                    Ab, maiores saepe, sint dolor reiciendis debitis esse odit eos quaerat minima ipsum veritatis ex?
                </p>
                <div className='info'>
                    <span>By: Kkibet</span>
                    <span>22 April 2022</span>
                </div>

                <hr />

                <div className='comments'>
                    <div className='compose'>
                        <img className='composeImg' src={Image} alt="composer_image"/>
                        <input className='composeInput' type="text" autofocus placeholder="Write a comment..."/>
                    </div>

                    <h2 className='commentsTitle'>Comments</h2>

                    <div className='allComments'>
                        <div className='comment'>
                            <img className='composeImg' src={Image} alt="composer_image"/>
                            <p className='message'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio asperiores qui quia facilis deleniti! Dicta ducimus nobis perspiciatis earum cupiditate, mollitia ea animi veniam nam accusantium repellendus hic iusto libero.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='relatedPosts'>
                <h2>Related Posts</h2>
                <div className='related'>
                    <Link to='../' className='link'>
                    <div className='relatedPost'>
                        <h4>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        </h4>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Est, sunt? Velit, itaque voluptatum consequuntur laboriosam iste, 
                            maxime quas, obcaecati vero assumenda hic aperiam. 
                            Libero adipisci doloremque ex natus numquam id?
                        </p>
                        <button className='button'>Read more <ArrowForward/></button>
                    </div>
                    </Link>
                </div>
            </div>

        </div>
    );
}