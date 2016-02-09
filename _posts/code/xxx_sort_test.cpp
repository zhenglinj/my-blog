#include <cstdlib>
#include <cstring>
#include <iostream>

#include "xxx_sort.h"

using namespace std;

int main(int argc, char *argv[])
{
    int a[] = {2, 45, 4, 7, 32, 63, 1, 3};
    size_t size = sizeof(a)/sizeof(a[0]);

    for (size_t i = 0; i < size; ++i)
        cout << a[i] << " ";
    cout << endl;

    // merge_sort<int>(a, size);
    shell_sort<int>(a, size);

    for (size_t i = 0; i < size; ++i)
        cout << a[i] << " ";
    cout << endl;

    return 0;
}
