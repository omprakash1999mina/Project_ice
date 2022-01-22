import React from 'react';
import Products from '../components/Products';
import Contact from '../components/Contact';


const Home = (props) => {
    // window.scrollTo(0,0);
    // console.log('home')
    return (
        <section >
        <div className="hero py-16 mx-4 pt-32 ">
            <div className="container mx-auto flex items-center justify-between">
                <div className="w-1/2">
                    <h6 className="md:text-lg text-sm"><em>Are you hungry?</em></h6>
                    <h1 className="text-2xl md:text-6xl font-bold">Don't wait !</h1>
                    <button onClick={ ()=>{ props.history.push({ pathname: '/cart' })  } } className="md:px-6 md:py-2 px-4 py-2 animate-bounce rounded-full text-xs md:text-lg text-white font-bold md:mt-10 mt-4 bg-yellow-500 hover:bg-yellow-600">Order Now</button>
                </div>
                <div className="w-1/2">
                    <img className="md:w-4/5 w-auto" src="/images/pizza.png" alt="pizza" />
                </div>
            </div>
        </div>
        <div className="pb-24">
            <Products />
        </div>
            <Contact/>
            <section className="text-gray-600 body-font ">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <h2 className="sm:text-3xl text-2xl font-bold uppercase title-font mb-4 text-gray-900" >Our Founder</h2>
                <div className="mt-1 flex items-center">
                    <span className="inline-block overflow-hidden ">
                        <img className="object-cover" alt="Founder" src="/images/op.png" />
                    </span>
                </div>
                {/* <img className="sm:w- mb-10 object-cover object-center rounded" alt="hero" src="/images/op.png"/> */}
                <div className="text-center lg:w-2/3 w-full">
                <h1 className="title-font sm:text-2xl text-2xl mb-4 font-medium text-gray-900">Om Prakash Bairwa</h1>
                
                <div className='p-4'>
                <a className="text-black active:bg-blue-700 hover:bg-gray-700 hover:rounded-lg hover:text-white px-3 py-2  font-medium" href="https://github.com/omprakash1999mina" target="_blank" rel="noopener noreferrer">GitHub</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a className="text-black active:bg-blue-700 hover:bg-gray-700 hover:rounded-lg hover:text-white px-3 py-2  font-medium" href="https://in.linkedin.com/in/om-prakash-bairwa-a82a2b203?trk=people-guest_people_search-card" target="_blank" rel="noopener noreferrer">LinkedIn</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a className="text-black active:bg-blue-700 hover:bg-gray-700 hover:rounded-lg hover:text-white px-3 py-2  font-medium" href="https://www.instagram.com/royal_iitian/?r=nametag" target="_blank" rel="noopener noreferrer">Instagram</a>

                </div>
                <h4 className='text-black pb-2'>Young IITian and Web-Developer | Open-Source contributor </h4>
                <br/>
                <p className="mb-8 leading-relaxed">
                    Pursuing a B.Tech + M.Tech Dual degree [ IDD ] in Electrical Engineering and a specialization in Power-Electronics udergraduate at IIT BHU, Varanasi. I'm interested in collaborate with others and build something exciting.I build some projects with team work and the experience was amazing .I have a good command on C,C++,Data-Structures and Web-Development with MERN stack. I enjoy bringing projects alive from scratch, from designing the UI, laying out the REST-API'S and developing secure, fast Databases and debugging to completion.
                    Want to Develope something Secure Don't wait just contact me i'm here for you, collaborate with me . 
                </p>
                </div>
            </div>
            </section>


           
       </section>
    )
}

export default Home;