import React from 'react';
import Products from '../components/Products';
import Contact from '../components/Contact';


const Home = (props) => {
    // window.scrollTo(0,0);
    console.log('home')
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
                    <span className="inline-block w-60 overflow-hidden ">
                        <img className="object-cover" alt="Founder" src="/images/op.png" />
                    </span>
                </div>
                {/* <img className="sm:w- mb-10 object-cover object-center rounded" alt="hero" src="/images/op.png"/> */}
                <div className="text-center lg:w-2/3 w-full">
                <h1 className="title-font sm:text-2xl text-2xl mb-4 font-medium text-gray-900">Om Prakash Bairwa</h1>
                
                <div className='p-4'>
                <a className="text-black active:bg-blue-700 hover:bg-gray-700 hover:rounded-lg hover:text-white px-3 py-2  font-medium" href="/error" target="_blank" rel="noopener noreferrer">YouTube</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a className="text-black active:bg-blue-700 hover:bg-gray-700 hover:rounded-lg hover:text-white px-3 py-2  font-medium" href="https://in.linkedin.com/in/om-prakash-bairwa-a82a2b203?trk=people-guest_people_search-card" target="_blank" rel="noopener noreferrer">LinkedIn</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a className="text-black active:bg-blue-700 hover:bg-gray-700 hover:rounded-lg hover:text-white px-3 py-2  font-medium" href="https://www.instagram.com/royal_iitian/?r=nametag" target="_blank" rel="noopener noreferrer">Instagram</a>

                </div>
                <h4 className='text-black pb-2'>Young TEDx speaker and #1 Online JEE Educator | Founder of 5 YouTube Channels with 2.5 million young hustlers. </h4>
                <br/>
                <p className="mb-8 leading-relaxed">I help students across India find their right career path. I have been a guest speaker at 22 Colleges including Top IITs, BITS Pilani, IIIT's, NIT's, SRCC, Jadavpur University etc. I am the #1 Educator of JEE on India's biggest online platform
                and I believe that everyone has the right to quality education and with the help of my social media platforms, I have helped millions of students find their path to success in the last 5 years. In the next few decades, India will rise
                as the leader of the world with the maximum young workforce, but for this, we need some good pilots who can take us through this. I help these young hustlers find their true potential so that they can fly us to victory.</p>
                
                </div>
            </div>
            </section>


           
       </section>
    )
}

export default Home;