"use client";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ThumbUpAltIcon from "@mui/icons-material/FitnessCenter";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  reviews: {
    rating: number;
    comment: string;
    reviewerName: string;
  }[];
}

interface ProductCardProps {
  product: Product;
}

export default function GymCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFavoriteToggle = () => setIsFavorite(!isFavorite);
  const handleLikeToggle = () => setIsLiked(!isLiked);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card className="w-80 h-[480px] shadow-lg rounded-lg overflow-hidden relative flex flex-col">
      {/* Botão de favorito no canto superior direito */}
      <IconButton
        className="absolute top-2 right-2 bg-white/80 hover:bg-white z-10"
        onClick={handleFavoriteToggle}
        aria-label="Favoritar"
        size="small"
      >
        {isFavorite ? (
          <StarIcon className="text-yellow-400" />
        ) : (
          <StarBorderIcon className="text-yellow-400" />
        )}
      </IconButton>

      {/* Imagem */}
      <CardMedia
        component="img"
        image={product.images[0]}
        alt={product.title}
        className="object-cover w-full h-48"
      />

      <CardContent className="bg-white flex-1 flex flex-col justify-between">
        <div>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className="font-bold text-gray-800"
          >
            {product.title}
          </Typography>
          <div className="flex items-center text-gray-600 mb-2">
            <LocationOnIcon className="mr-1 text-blue-500" fontSize="small" />
            <Typography variant="body2">
              ${product.price}
            </Typography>
          </div>
        </div>

        {/* Like e comentários */}
        <div className="flex items-center gap-4 mt-4 pt-2 border-t border-gray-100">
          <IconButton
            onClick={handleLikeToggle}
            aria-label="Curtir"
            size="small"
          >
            <ThumbUpAltIcon
              className={isLiked ? "text-blue-600" : "text-gray-400"}
            />
          </IconButton>
          <IconButton
            aria-label="Comentários"
            size="small"
            onClick={handleOpen}
          >
            <ChatBubbleOutlineIcon className="text-gray-500" />
          </IconButton>
        </div>
      </CardContent>

      {/* Modal de comentários */}
      <Modal open={open} onClose={handleClose}>
        <Box
          className="absolute left-1/2 top-1/2 bg-white rounded-lg shadow-lg p-6 text-gray-800"
          sx={{
            minWidth: 320,
            maxWidth: 400,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" className="mb-4 font-bold">
            Comentários
          </Typography>

          <div className="max-h-48 overflow-y-auto mb-4">
            {product.reviews.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Nenhum comentário ainda.
              </Typography>
            )}
            {product.reviews.map((review, index) => (
              <div key={index} className="mb-2">
                <span className="font-semibold text-gray-800">{review.reviewerName}:</span>{" "}
                <span className="text-gray-800">{review.comment}</span>
                <div className="text-yellow-500">⭐ {review.rating}</div>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </Card>
  );
}
