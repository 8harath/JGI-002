//2.1 odd or even program

#include <stdio.h>
#include <conio.h>

int main() {
    int num;
    clrscr();
    // Prompt the user to enter a number
    printf("Enter an integer: ");
    scanf("%d", &num);

    // Check if the number is even or odd using the modulo operator (%)
    if (num % 2 == 0) {
	printf("%d is even.\n", num);
    } else {
	printf("%d is odd.\n", num);
    }
    getch();
    return 0;
}
