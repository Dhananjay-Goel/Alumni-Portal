import React from 'react';


const NavLinks = () => {
    let isadmin = false;
    if(localStorage.getItem("isAdmin") === "true"){
        isadmin = true;
    }
    const links = [
        {
            name: "Home",
            path: "/home",
            submenu: true,
            sublinks: [
                { name: "News and Updates", path: "/News" },
                { name: "Become A member", path: (isadmin ? "/becomeamember" : "/signup" )},       
            ]
        },
        {
            name: "Giving Back",
            submenu: true,
            sublinks: [
                // { name: "Alumni Initiatives", path: "/" },
                { name: "Donate", path: "/Donate" },
                { name: "Give Back in Kind", path: "/givingback" },
                { name: "Fundraising", path: "/fund" },
            ],
            path: "/givingback",
        },
        {
            name: "Community Events",
            // path: "/CommunityEvents",
            submenu: true,
            sublinks: [
                { name: "Events", path: "/events" },
                { name: "Reunions", path: "/CommunityEvents" },
                {name: "Interns/Full-Time", path: "/Jobs" },
            ]
        },
        {
            name: "Executive Committee", 
            path: "/Executivecommittee"
        },
        {
            name: "Constitution", 
            path: "/constitution"
        },
        {
            name: "Contact us",
            path: "/ContactUs"
        },
    ];

    return (
        <div className="flex justify-center lg:justify-start">
            <div className="flex flex-col lg:flex-row">
                {links.map((link) => (
                    <div key={link.path} className="relative group">
                        <a
                            href={link.path}
                            className="block py-2 px-4 md:py-4 md:px-6 hover:text-blue-500 duration-300"
                        >
                            {link.name}
                        </a>
                        {link.submenu && (
                            <div
                                className="absolute top-full border-2 border-indigo-950 rounded-lg left-0 hidden group-hover:block bg-gray-100 w-[110px] z-10 shadow-xl"
                            >
                                {/* <div className="py-2">
                                    <div className="w-4 h-4 -mt-1 ml-3 bg-gray-100 transform rotate-45 absolute"></div>
                                </div> */}
                                <div className="bg-slate-200 rounded-lg ">
                                <div className="">
                                    <div className="flex flex-col gap-[5px] ">
                                        {link.sublinks.map((sublink) => (

                                            <a
                                                key={sublink.path}
                                                href={sublink.path}
                                                className="text-sm text-gray-600 my-1  duration-300  h-[45px] hover:bg-blue-300 hover:text-white flex items-center  " 
                                            >
                                                <div className='ml-3'>
                                                {sublink.name}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                </div>
                            
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavLinks;
