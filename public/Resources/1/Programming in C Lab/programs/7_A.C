#include<stdio.h>
#include<conio.h>

int main()    
{
 int i,fact,number;
 fact=1;
 clrscr ();
 printf("Enter a number: ");    
  scanf("%d",&number);    
    for(i=1;i<=number;i++){    
      fact=fact*i;    
  }    
  printf("Factorial of %d is: %d",number,fact);
getch ();
return 0;  
}   
