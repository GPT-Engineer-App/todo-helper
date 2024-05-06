import { useState } from 'react';
import { Box, Button, Container, Flex, Heading, IconButton, Input, List, ListItem, Text } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex direction="column" align="center" mb={5}>
        <Heading mb={4}>Todo App</Heading>
        <Flex as="nav">
          <Button mr={2}>Home</Button>
          {/* Future navigation items */}
        </Flex>
      </Flex>
      <Flex mb={4}>
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          mr={2}
        />
        <Button onClick={handleAddTask} colorScheme="blue">Add</Button>
      </Flex>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md">
            <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
            <Flex>
              <IconButton
                icon={<FaCheckCircle />}
                onClick={() => handleToggleComplete(task.id)}
                aria-label="Complete task"
                colorScheme={task.isCompleted ? "green" : "gray"}
                mr={2}
              />
              <IconButton
                icon={<FaTrash />}
                onClick={() => handleDeleteTask(task.id)}
                aria-label="Delete task"
                colorScheme="red"
              />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;