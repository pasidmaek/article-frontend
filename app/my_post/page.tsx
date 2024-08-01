'use client'
import React, { useEffect, useState } from "react";
import { title } from "@/components/primitives";
import { getMyPost, deleteArticle } from "@/config/service/post";
import CardComponent from "@/components/card";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

export default function AboutPage() {
  const { isOpen: isDeleteOpen, onOpenChange: onDeleteOpenChange, onClose: onDeleteClose } = useDisclosure();
  const [posts, setPosts] = useState<ArticleProps[] | null>(null);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);

  const getPost = async () => {
    const result = await getMyPost();
    setPosts(result.data);
  };

  const handleDelete = async () => {
    if (currentPostId) {
      const result = await deleteArticle(currentPostId);
      if (result.success) {
        console.log('Deleted post');
        getPost();
      } else {
        console.error(result.message);
      }
      onDeleteClose();
    }
  };

  useEffect(() => {
    if (!posts) {
      getPost();
    }
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
      <div>
        {posts ? posts.map((post: ArticleProps, index) => (
          <CardComponent key={index} id={post.id} onDelete={openDeleteModal} />
        ))
          : <p>No Post</p>
        }
      </div>
    </div>
  );
}
