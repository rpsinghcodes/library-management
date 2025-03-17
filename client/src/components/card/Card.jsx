// export default function Card({img, title, author}) {
//     return (
//         <div>
//             <div>
//                 <img src={img} alt="book"/>
//             </div>
//                 <div>
//                     <h1>{title}</h1>
//                     <p>{author}</p>
//                 </div>
//         </div>
//     )
// }
import { Link } from 'react-router-dom';
import React from 'react';

const Card = ({ title, img, id }) => {
  console.log(title, img, id);
  return (
    <Link to={`/detail/${id}`}>
    <div className="group relative w-64 rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300">
      {/* Book Cover */}
      <img
        src={img}
        alt={title}
        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Book Info */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 truncate">
          {title}
        </h2>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
    </div>
    </Link>
  );
};

export default Card;