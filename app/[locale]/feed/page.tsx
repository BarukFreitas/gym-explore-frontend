"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Container, Box, Typography, TextField, Button, CircularProgress, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import Loading from "@/app/components/loading/Loading";
import Image from 'next/image';
import { toast } from 'react-toastify';
import { RootState } from "@/app/store/store";

import { useCreatePostMutation, useGetAllPostsQuery, useDeletePostMutation } from "@/app/store/postApi";
import { PostCreateRequest, PostResponse } from "@/app/types/post";
import { ErrorResponse } from "@/app/types/auth";

export default function FeedPage() {
    const t = useTranslations("FeedPage");
    const router = useRouter();
    const locale = useLocale();

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const currentUserId = useSelector((state: RootState) => state.auth.id);
    const [checkingAuth, setCheckingAuth] = useState(true);

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

    const [createPost, { isLoading: isCreatingPost, isSuccess: createPostSuccess, data: createPostResponseData, error: createPostErrorData }] = useCreatePostMutation();
    const { data: posts, isLoading: isPostsLoading, error: postsError, refetch: refetchPosts } = useGetAllPostsQuery();

    const [deletePost, { isLoading: isDeletingPost, error: deletePostError, isSuccess: deletePostSuccess }] = useDeletePostMutation();

    const [newPostContent, setNewPostContent] = useState("");
    const [newPostImageUrl, setNewPostImageUrl] = useState("");
    const [postErrorMessage, setPostErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (createPostSuccess) {
            if (createPostResponseData?.pointsAwarded) {
                toast.success("🎉 Você ganhou 10 pontos por criar um post!");
            } else {
                toast.info("Post criado com sucesso!");
            }
            setNewPostContent("");
            setNewPostImageUrl("");
            refetchPosts();
        }
    }, [createPostSuccess, createPostResponseData, refetchPosts]);

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

        const postData: PostCreateRequest = {
            content: newPostContent,
            imageUrl: newPostImageUrl.trim() ? newPostImageUrl : undefined,
        };

        try {
            await createPost({ userId: currentUserId, data: postData }).unwrap();
        } catch (err: any) {
            console.error("Falha ao criar postagem:", err);
            const errorMessage = err?.data?.error || t("genericPostError");
            setPostErrorMessage(errorMessage);
            toast.error(errorMessage);
        }
    };

    const handleDeletePost = useCallback(async (postId: number) => {
        if (!window.confirm(t("confirmDeletePost"))) {
            return;
        }
        try {
            await deletePost(postId).unwrap();
            refetchPosts();
            toast.success(t("postDeletedSuccess"));
        } catch (err: any) {
            console.error("Erro ao excluir post:", err);
            toast.error((err as ErrorResponse)?.error || t("postDeletedError"));
        }
    }, [deletePost, refetchPosts, t]);

    if (checkingAuth) return <Loading />;
    if (!isLoggedIn) return <Loading />;

    return (
        <div className="relative w-full min-h-screen bg-black">
            <Image
                src="/feed-academia.jpg"
                alt={t("feedBackgroundImageAlt")}
                layout="fill"
                objectFit="cover"
                priority
                className="fixed inset-0 z-0 opacity-20"
            />

            <Container maxWidth="md" className="relative z-10 py-8 mt-16 min-h-screen">
                <Box className="relative flex flex-col items-center p-6 rounded-lg shadow-xl bg-white bg-opacity-90 mb-8">
                    <Typography variant="h4" component="h1" className="mb-6 text-green-600">
                        {t("feedTitle")}
                    </Typography>

                    {postErrorMessage && !isCreatingPost && (
                        <Alert severity="error" className="w-full mb-4">
                            {postErrorMessage}
                        </Alert>
                    )}
                    {deletePostSuccess && (
                        <Alert severity="success" className="w-full mb-4">
                            {t("postDeletedSuccess")}
                        </Alert>
                    )}
                    {deletePostError && (
                        <Alert severity="error" className="w-full mb-4">
                            {(deletePostError as ErrorResponse)?.error || t("postDeletedError")}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handlePostSubmit} className="w-full mb-8">
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            label={t("newPostPlaceholder")}
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            className="mb-4"
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label={t("imageUrlPlaceholder")}
                            value={newPostImageUrl}
                            onChange={(e) => setNewPostImageUrl(e.target.value)}
                            className="mb-4"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isCreatingPost || !newPostContent.trim()}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            {isCreatingPost ? <CircularProgress size={24} color="inherit" /> : t("postButton")}
                        </Button>
                    </Box>
                </Box>

                <Box className="relative flex flex-col space-y-4">
                    <Typography variant="h5" component="h2" className="mb-4 text-green-600">
                        {t("recentPostsTitle")}
                    </Typography>

                    {isPostsLoading && <Loading />}
                    {postsError && <Alert severity="error" className="w-full mb-4">{(postsError as ErrorResponse)?.error || t("errorLoadingPosts")}</Alert>}

                    {posts && posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className="relative bg-white p-4 rounded-lg shadow border border-gray-200">
                                <Typography variant="subtitle1" className="font-bold text-gray-800">{post.username}</Typography>
                                <Typography variant="body2" className="text-gray-700 mt-1">{post.content}</Typography>
                                {post.imageUrl && (
                                    <Box sx={{ mt: 2 }}>
                                        <img src={post.imageUrl} alt="Post image" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
                                    </Box>
                                )}
                                <Typography variant="caption" className="text-gray-500 mt-2 block">
                                    {new Date(post.timestamp).toLocaleString(locale)}
                                </Typography>

                                {currentUserId === post.userId && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeletePost(post.id)}
                                        disabled={isDeletingPost}
                                        sx={{ mt: 2 }}
                                    >
                                        {isDeletingPost ? <CircularProgress size={20} color="inherit" /> : t("deletePostButton")}
                                    </Button>
                                )}
                            </div>
                        ))
                    ) : (
                        !isPostsLoading && !postsError && (
                            <Typography className="text-gray-600 italic">
                                {t("noPostsYet")}
                            </Typography>
                        )
                    )}
                </Box>
            </Container>
        </div>
    );
}