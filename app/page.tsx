'use client';
import "../config/index.css";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@nextui-org/button";
import CardComponent from "@/components/card";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { deleteArticle, getAllPost, postArticle } from "@/config/service/post";
import { useRouter } from "next/navigation";
import { useAuth } from "@/config/context/AuthContext";
import { Spinner } from "@nextui-org/spinner";

export default function Home() {
  const router = useRouter();
  const { isOpen: isDeleteOpen, onOpenChange: onDeleteOpenChange, onClose: onDeleteClose } = useDisclosure();
  const { isOpen, onOpenChange, onClose } = useDisclosure();
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const { isLogin } = useAuth()
  const [isFetch, setIsFetch] = useState<boolean>(true);
  const [posts, setPosts] = useState<ArticleProps[]>([]);
  const [article, setArticle] = useState<PostProps>({
    title: "",
    body: ""
  });

  const getPost = async () => {
    try {
      const result = await getAllPost();
      console.log(result.data)
      setPosts(result.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsFetch(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
  }, [posts]);

  const handlePostArticle = async () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const result = await postArticle(article, JSON.parse(user));
        if (result.success) {
          console.log("Create success");
          localStorage.removeItem("article-not-save");
          onClose();
          getPost();
          setArticle({
            title: "",
            body: ""
          });
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error posting article:", error);
      }
    } else {
      localStorage.setItem("article-not-save", JSON.stringify(article));
      router.push('/signin');
    }
  };

  const handleDelete = async () => {
    if (currentPostId) {
      try {
        const result = await deleteArticle(currentPostId);
        if (result.success) {
          console.log('Deleted post');
          getPost()
          // setPosts((prevPosts) => prevPosts!.filter(post => post.id !== currentPostId));
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
      onDeleteClose();
    }
  };

  const openDeleteModal = (id: string | null) => {
    if (id) {
      setCurrentPostId(id);
      onDeleteOpenChange();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange} className="max-w-sm p-4">
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this post?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" onPress={onDeleteClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="h-[700px] min-w-[900px] overflow-auto p-4">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <Input
              placeholder="Title"
              value={article.title}
              onChange={(e) => setArticle((prev) => ({ ...prev, title: e.target.value }))}
            />
          </ModalHeader>
          <ModalBody>
            <Textarea
              type="text"
              placeholder="Type..."
              value={article.body}
              onChange={(e) => setArticle((prev) => ({ ...prev, body: e.target.value }))}
              className="w-full"
              minRows={10}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handlePostArticle}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button onPress={isLogin ? onOpenChange : () => router.push('/signin')} variant="faded" className="w-4/5 h-10">
        Create Article
      </Button>
      {
        isFetch ?
          <Spinner /> :
          <div>
            {posts.length === 0 ?
              <p>No post!</p>
              : posts
                .sort((a, b) => {
                  const dateA = new Date(a.created_at).getTime();
                  const dateB = new Date(b.created_at).getTime();
                  return dateB - dateA;
                })
                .map((post) => (
                  <CardComponent key={post.id} id={post.id} onDelete={openDeleteModal} />
                ))}
          </div>
      }
    </section>
  );
}
