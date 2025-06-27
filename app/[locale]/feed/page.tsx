"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container, Typography, Box, TextField, Button, CircularProgress, Alert, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Loading from "@/app/components/loading/Loading";

import { useCreatePostMutation, useGetAllPostsQuery } from "@/app/store/postApi";
import { PostCreateRequest, PostResponse } from "@/app/types/post";
import { ErrorResponse } from "@/app/types/auth";

import PostCard from '@/app/components/feed/PostCard';

import feedBgImage from "@/public/feed-academia.jpg";

export default function FeedPage() {
  const t = useTranslations("FeedPage");
  const router = useRouter();
  const locale = useLocale();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const currentUserId = useSelector((state: RootState) => state.auth.id);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImageUrl, setNewPostImageUrl] = useState("");
  const [postErrorMessage, setPostErrorMessage] = useState<string | null>(null);

  const [createPost, { isLoading: isCreatingPost, isError: createPostError, error: createPostErrorData, isSuccess: createPostSuccess }] = useCreatePostMutation();
  const { data: posts, isLoading: isPostsLoading, error: postsError, refetch: refetchPosts } = useGetAllPostsQuery();

  useEffect(() => {
    if (checkingAuth) {
        const timer = setTimeout(() => {
            if (!isLoggedIn) {
                router.push(`/${locale}/`);
            } else {
                setCheckingAuth(false);
            }
        }, 500);
        return () => clearTimeout(timer);
    }
  }, [isLoggedIn, router, checkingAuth, locale]);

  const handlePostSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPostErrorMessage(null);

    if (!newPostContent.trim()) {
        setPostErrorMessage(t("emptyPostError"));
        return;
    }

    if (currentUserId === null) {
        setPostErrorMessage(t("notLoggedInToPostError"));
        router.push(`/${locale}/auth`);
        return;
    }

    try {
      const postData: PostCreateRequest = {
        content: newPostContent,
        imageUrl: newPostImageUrl.trim() ? newPostImageUrl.trim() : undefined,
      };

      await createPost({ userId: currentUserId, data: postData }).unwrap();
      setNewPostContent("");
      setNewPostImageUrl("");
      refetchPosts();
    } catch (err: any) {
        console.error("Falha ao criar postagem:", err);
        setPostErrorMessage((err as ErrorResponse)?.error || t("genericPostError"));
    }
  };

  if (checkingAuth) return <Loading />;
  if (!isLoggedIn) return <Loading />;

  return (
    <Box className="relative w-full min-h-screen flex flex-col items-center py-8">
      <div className="absolute inset-0 z-0">
        <Image
          src={feedBgImage}
          alt="Pessoas em uma academia"
          layout="fill"
          objectFit="cover"
          className="opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      <Container maxWidth="md" className="relative z-10 py-8 mt-16">
        <Paper elevation={3} className="p-6 rounded-lg shadow-2xl bg-white bg-opacity-80 backdrop-blur-sm mb-8">
          <Typography variant="h4" component="h1" className="mb-6 text-green-700 font-bold text-center">
            {t("feedTitle")}
          </Typography>

          {postErrorMessage && (
              <Alert severity="error" className="w-full mb-4">
                  {postErrorMessage}
              </Alert>
          )}
          {createPostSuccess && (
              <Alert severity="success" className="w-full mb-4">
                  {t("postSuccessMessage")}
              </Alert>
          )}

          <Box component="form" onSubmit={handlePostSubmit} className="w-full">
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label={t("newPostPlaceholder")}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="mb-4"
              sx={{ '.MuiOutlinedInput-root': { backgroundColor: 'rgba(255,255,255,0.8)' } }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label={t("imageUrlPlaceholder")}
              value={newPostImageUrl}
              onChange={(e) => setNewPostImageUrl(e.target.value)}
              className="mb-4"
              sx={{ '.MuiOutlinedInput-root': { backgroundColor: 'rgba(255,255,255,0.8)' } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isCreatingPost || !newPostContent.trim()}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 transition-all duration-300 ease-in-out"
            >
              {isCreatingPost ? <CircularProgress size={24} color="inherit" /> : t("postButton")}
            </Button>
          </Box>
        </Paper>

        <Box className="flex flex-col space-y-4">
          <Typography variant="h5" component="h2" className="mb-4 text-white font-bold text-center drop-shadow">
            {t("recentPostsTitle")}
          </Typography>

          {isPostsLoading && <Loading />}
          {postsError && (
            <Alert severity="error" className="w-full mb-4">
              {(postsError as ErrorResponse)?.error || t("errorLoadingPosts")}
            </Alert>
          )}

          {posts && posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            !isPostsLoading && !postsError && (
              <Typography className="text-white italic text-center drop-shadow">
                  {t("noPostsYet")}
              </Typography>
            )
          )}
        </Box>
      </Container>
    </Box>
  );
}