#include <stdio.h>
#include <conio.h>
int main() {
    int a = 5, b = 10;
    clrscr();
    printf("Before swapping: a = %d, b = %d\n", a, b);

    a = a + b;
    b = a - b;
    a = a - b;

    printf("After swapping: a = %d, b = %d\n", a, b);
    getch ();
    return 0;
}
