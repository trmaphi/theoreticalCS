/**
 * This is almost identical to the articles VM
 * From https://blog.felixangell.com/virtual-machine-in-c/
 **/

#include <stdbool.h>
#include <stdio.h>

bool running = true; // Indicate the machine still running
int ip = 0;  // Instruction pointer, to count which instruction is executing.
             // Must be updated if the next instruction start running
int sp = -1; //

int stack[256];

typedef enum { PSH, ADD, POP, HLT } InstructionSet;

const int program[] = {PSH, 5, PSH, 6, ADD, POP, HLT};

/**
 * Get the current instruction by Instruction pointer value
 **/
int fetch() { return program[ip]; }

void eval(int instr) {
  switch (instr) {
  // Give halt signal to stop vm
  case HLT: {
    running = false;
    printf("done\n");
    break;
  }
  // Push value to stack
  case PSH: {
    sp++;
    stack[sp] = program[++ip];
    break;
  }
  // Pop value from stack and print out popped value
  case POP: {
    int val_popped = stack[sp--];
    printf("popped %d\n", val_popped);
    break;
  }
  case ADD: {
    // first we pop the stack and store it as a
    int a = stack[sp--];

    // then we pop the top of the stack and store it as b
    int b = stack[sp--];

    // we then add the result and push it to the stack
    int result = b + a;
    sp++;               // increment stack pointer **before**
    stack[sp] = result; // set the value to the top of the stack

    // all done!
    break;
  }
  }
}

int main() {
  while (running) {
    eval(fetch());
    ip++; // increment the ip every iteration
  }
}
