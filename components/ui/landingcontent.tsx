"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./card";

const testimonials = [{
    name: "John Doe",
    avatar: "CEO",
    title: "Company CEO",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis luctus nisl. Nulla facilisi. Donec vitae euismod nunc."
},
{
    name: "Udin Gambut",
    avatar: "UG",
    title: "Raja",
    description: "Amazing product! Worth the while, 100%."
},
{
    name: "Lorem Ipsum",
    avatar: "LI",
    title: "Placeholder",
    description: "Quite comfortable, very pleasant."
},
{
    name: "John Doe",
    avatar: "CEO",
    title: "Company CEO",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis luctus nisl. Nulla facilisi. Donec vitae euismod nunc."    
},
{
    name: "John Doe",
    avatar: "CEO",
    title: "Company CEO",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis luctus nisl. Nulla facilisi. Donec vitae euismod nunc."
},
{
    name: "John Doe",
    avatar: "CEO",
    title: "Company CEO",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis luctus nisl. Nulla facilisi. Donec vitae euismod nunc."
}]

const LandingContent = () => {
    return ( 
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-gray-800 border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                <p>{item.description}</p>
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
     );
}
 
export default LandingContent;