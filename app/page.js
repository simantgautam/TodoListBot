"use client";
import { AddTodo, deleteTodo, getData, patchData } from "@/Redux/action";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isNewOpen, onNewOpen, onNewClose } = useDisclosure();

  const [task, setTask] = useState("");

  const dispatch = useDispatch();

  const handleTask = (e) => {
    setTask(e.target.value);
    console.log(e.target.value);
  };

  const handleTodo = () => {
    dispatch(AddTodo(task));
    onClose();
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const todos = useSelector((state) => {
    return state.todos;
  });

  const handleEditTodo = (id) => {
    // dispatch(patchData(id, task));
    // onClose();
  };

  const handleDelete = () => {
    dispatch(patchData(task));
  };

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
      </div>
      <div className=" flex flex-col gap-4">
        <Button onClick={onOpen}>Add New Task</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Task Name</FormLabel>
                <Input placeholder="Enter Task" onChange={handleTask} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleTodo}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Task</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {todos.map((elem, i) => {
                return (
                  <Tr key={i}>
                    <Td>{elem.title}</Td>
                    <Td
                      onClick={() => {
                        handleEditTodo(elem.id, elem.title);
                      }}
                    >
                      Edit
                    </Td>
                    <Td
                      onClick={() => {
                        dispatch(deleteTodo(elem.id));
                      }}
                    >
                      Delete
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            ;
          </Table>
        </TableContainer>
      </div>
    </main>
  );
}
