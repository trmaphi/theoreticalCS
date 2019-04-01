// 1st program to show that array and pointers are different
#include <stdio.h>

int main()
{
    int arr[] = {10, 20, 30, 40, 50, 60};
    int *ptr = arr;

    // sizof(int) * (number of element in arr[]) is printed
    printf("Size of arr[] %ld\n", sizeof(arr));

    // sizeof a pointer is printed which is same for all type
    // of pointers (char *, void *, etc)
    printf("Size of ptr %ld\n", sizeof(ptr));
    return 0;
}