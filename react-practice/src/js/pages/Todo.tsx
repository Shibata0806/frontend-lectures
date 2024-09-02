import * as React from "react";
import { NewTodoForm } from "../components/todo/NewTodoForm";
import { useTodoList } from "../hooks/use-todo-list";
import { useAuth } from "../hooks/use-auth";
import { Avatar, Box, Button, Heading, HStack, Input } from "@chakra-ui/react";
import { TodoTable } from "../components/todo/TodoTable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Todo = () => {
  const { todoList, addTodo, deleteTodo, filterWord, setFilterWord } =
    useTodoList();
  const { isLoggedIn, logout, userName } = useAuth();
  const navigate = useNavigate();

  // ログアウト中にアクセスされたら、/loginに遷移させる
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <Box as="main" w="720px" mx="auto" mt="20">
      <HStack as="header" justifyContent="space-between" spacing="4">
        <Heading as="h1" size="2xl">
          TODO
        </Heading>
        <HStack justifyContent="end" spacing="4">
          <HStack spacing="2">
            <Avatar bg="teal.500" size="xs" />
            <Box>{userName}</Box>
          </HStack>
          <Box>
            <Button onClick={logout} colorScheme="red" size="xs">
              ログアウト
            </Button>
          </Box>
        </HStack>
      </HStack>
      <Box mt="20" as="section">
        <Heading as="h2" size="xl">
          新規TODO作成
        </Heading>
        <Box mt="10">
          <NewTodoForm addTodo={addTodo} />
        </Box>
      </Box>
      <Box mt="20" as="section">
        <Heading as="h2" size="xl">
          TODO一覧
        </Heading>
        <Box mt="10">
          <Input
            placeholder="絞込み"
            value={filterWord}
            onChange={(e) => setFilterWord(e.target.value)}
            w={40}
          />
        </Box>
        <Box mt="10">
          <TodoTable todoList={todoList} deleteTodo={deleteTodo} />
        </Box>
      </Box>
    </Box>
  );
};
