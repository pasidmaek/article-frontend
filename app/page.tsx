'use client'
import "../config/index.css"
import { useEffect, useState } from "react";
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

export default function Home() {
  const router = useRouter();
  const { isOpen: isDeleteOpen, onOpenChange: onDeleteOpenChange, onClose: onDeleteClose } = useDisclosure();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [post, setPost] = useState<ArticleProps[]>([]);
  const [article, setArticle] = useState<PostProps>({
    title: "",
    body: ""
  });

  const getPost = async () => {
    const result = await getAllPost();
    setPost(result.data);
  };

  const handlePostArticle = async () => {
    const user = localStorage.getItem('user');
    if (user) {
      const result = await postArticle(article, JSON.parse(user));
      if (result.success) {
        console.log("create success");
        onClose();
        const newPost: ArticleProps = result.data as ArticleProps;
        setPost([newPost, ...post]);
      } else {
        console.error(result.message);
      }
    } else {
      localStorage.setItem("article-not-save", JSON.stringify(article));
      router.push('/signin');
    }
  };

  const handleDelete = async () => {
    if (currentPostId) {
      console.log(currentPostId)
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
    getPost();
  }, [post]);

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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="min-h-[600px] min-w-[900px] overflow-auto p-4">
        <ModalContent>
          {() => (
            <>
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
                  className="w-full min-h-100"
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
            </>
          )}
        </ModalContent>
      </Modal>
      <Button onPress={onOpen} variant="faded" className="w-4/5 h-10">
        Create Article
      </Button>
      <div>
        {post.map((post, index) => (
          <CardComponent key={index} id={post.id} onDelete={openDeleteModal} />
        ))}
      </div>
    </section>
  );
}
