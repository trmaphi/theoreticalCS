// Credit to https://www.dyclassroom.com/c/c-pointers-and-strings

#include <stdio.h>

int main(void)
{

    char city[4][12] = {
        "Chennai",
        "Kolkata",
        "Mumbai",
        "New Delhi" //
    };

    // array of pointers
    char *cityPtr[4] = {
        "Chennai",
        "Kolkata",
        "Mumbai",
        "New Delhi" //
    };

    // temporary variable
    int r, c;
    int size = 0;
    int sizeUsingPtr = 0;

    // print cities
    for (r = 0; r < 4; r++)
    {
        c = 0;
        while (*(cityPtr[r] + c) != '\0')
        {
            printf("%c", *(cityPtr[r] + c));
            sizeUsingPtr++;
            c++;
        }
        sizeUsingPtr++; // represent '\0' character size
        printf("\n");
    }

    printf("Size using normal 2-dimensional array %ld \n", sizeof(city)/sizeof(city[0][0]));
    printf("Size using pointer %d \n", sizeUsingPtr);

    return 0;
}