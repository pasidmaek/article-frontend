'use client'
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown";
import moment from "moment";
import { getPostById, updateArticle } from "@/config/service/post";
import { Input } from "@nextui-org/input";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Textarea } from "@nextui-org/input";
import More from "@/public/more";

export default function CardComponent({ id, onDelete }: { id: string, onDelete: (id: string | null) => void }) {
  const [isMyPost, setIsMyPost] = useState<boolean>()
  const [article, setArticle] = useState<ArticleProps | null>(null);
  const { isOpen: isArticleOpen, onOpen: onArticleOpen, onOpenChange: onArticleOpenChange } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onOpenEdit, onOpenChange: onEditOpenChange, onClose: onEditClose } = useDisclosure();

  useEffect(() => {
    if (!article) {
      handleFetchData();
    }
  }, [article]);

  const handleFetchData = async () => {
    const result = await getPostById(id);
    if (result.success) {
      setArticle(result.data);
      const user_acc = localStorage.getItem('user');
      if (user_acc && result.data) {
        setIsMyPost(JSON.parse(user_acc).id === result.data.user.id);
      }
    } else {
      console.error(result.message);
    }
  };

  const handleEdited = async () => {
    if (article) {
      const result = await updateArticle(article)
      if (result.success) {
        console.log('Edited post');
        handleFetchData()
        onEditClose();
      } else {
        console.error(result.message)
      }
    }
  };

  return (
    <>
      <Modal isOpen={isArticleOpen} onOpenChange={onArticleOpenChange} className="min-h-[600px] min-w-[900px] overflow-auto p-4">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {article?.title}
                <p className="text-slate-400 text-sm">
                  {article?.user.name}
                </p>
                <p className="text-slate-400 text-sm">
                  {moment(article?.updated_at).format('D/M/YYYY')}
                </p>
              </ModalHeader>
              <ModalBody>
                <ScrollShadow className="h-[700px]">
                  <p>
                    {article?.body}
                    {article?.body}
                    {article?.body}
                    {article?.body}
                    {article?.body}
                    {article?.body}
                    {article?.body}
                  </p>
                </ScrollShadow>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange} className="min-w-[900px] min-h-[600px] overflow-auto p-4">
        <ModalContent>
          {(onEditClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Input
                  placeholder="Title"
                  value={article?.title || ""}
                  onChange={(e) =>
                    setArticle((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                />
                <p className="text-slate-400 text-sm">
                  {article?.user.name}
                </p>
                <p className="text-slate-400 text-sm">
                  {moment(article?.updated_at).format('D/M/YYYY')}
                </p>
              </ModalHeader>
              <ModalBody>
                <Textarea
                  placeholder="Body"
                  value={article?.body || ""}
                  onChange={(e) => setArticle((prev) => prev ? { ...prev, body: e.target.value } : null)}
                  fullWidth
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onEditClose}>
                  Cancel
                </Button>
                <Button color="success" onPress={handleEdited}>
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Card className="w-[1000px] mb-4">
        <CardHeader className="flex gap-3">
          <div className="w-full flex justify-between">
            <div>
              <p className="text-md">{article?.title}</p>
              <p className="text-small text-default-500">{article?.user.name}</p>
            </div>
            {isMyPost &&
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly color="default" aria-label="Like">
                    <More />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User Menu">
                  <DropdownItem key="edit" onClick={onOpenEdit}>
                    Edit
                  </DropdownItem>
                  <DropdownItem key="delete" color="danger" onClick={() => {
                    onDelete(article ? article?.id : "")
                    // onOpenDelete()
                  }}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="truncate-text">{article?.body}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button onPress={onArticleOpen}>Read Article</Button>
        </CardFooter>
      </Card >
    </>
  );
}
