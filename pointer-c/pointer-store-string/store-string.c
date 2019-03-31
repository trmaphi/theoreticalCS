// Credits to https://www.dyclassroom.com/c/c-pointers-and-strings

#include <stdio.h>

int main(void)
{

    // pointer variable to store string
    // shortcut syntax for declare a string and a pointer,
    // then use that pointer to hold addess of the string
    char *strPtr = "Hello";

    // temporary pointer variable
    char *t = strPtr;

    // print the string
    while (*t != '\0')
    {
        printf("%c", *t);

        // move the t pointer to the next memory location
        t++;
    }

    return 0;
}