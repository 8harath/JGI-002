#include <stdio.h>
#include <conio.h>
int main() {

    int num, reversedNum = 0, remainder, originalNum;
    clrscr();
    printf("Enter an integer: ");
    scanf("%d", &num);

    originalNum = num; // Store the original number

    for (; num != 0; num /= 10) {
	remainder = num % 10;  // Get the last digit
	reversedNum = reversedNum * 10 + remainder;  // Append the digit to reversedNum
    }

    if (originalNum == reversedNum) {
	printf("%d is a palindrome.\n", originalNum);
    } else {
	printf("%d is not a palindrome.\n", originalNum);
    }
    getch();
    return 0;
}
