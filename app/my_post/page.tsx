'use client'
import React, { useEffect, useState } from "react";
import { title } from "@/components/primitives";
import { getMyPost, deleteArticle } from "@/config/service/post";
import CardComponent from "@/components/card";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { useAuth } from "@/config/context/AuthContext";

export default function AboutPage() {
  const { isLogin } = useAuth()
  const { isOpen: isDeleteOpen, onOpenChange: onDeleteOpenChange, onClose: onDeleteClose } = useDisclosure();
  const [posts, setPosts] = useState<ArticleProps[]>([]);
  const [isFetch, setIsFetch] = useState<boolean>(true);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);

  const getPost = async () => {
    try {
      const result = await getMyPost();
      console.log(result.data)
      setPosts(result.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsFetch(false);
    }
  };

  const handleDelete = async () => {
    if (currentPostId) {
      const result = await deleteArticle(currentPostId);
      if (result.success) {
        console.log('Deleted post');
        setPosts((prevItems) => prevItems!.filter((item) => item.id !== currentPostId));
        // getPost();
      } else {
        console.error(result.message);
      }
      onDeleteClose();
    }
  };

  useEffect(() => {
    getPost();
  }, [isLogin]);

  useEffect(() => {
  }, [posts]);

  const openDeleteModal = (id: string | null) => {
    if (id) {
      setCurrentPostId(id);
      onDeleteOpenChange();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange} className="max-w-sm p-4">
        <ModalContent>
          <>
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
          </>
        </ModalContent>
      </Modal>
      <h1 className={title()}>My post</h1>
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
    </div>
  );
}
