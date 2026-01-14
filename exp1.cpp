#include <bits/stdc++.h>
using namespace std;
void complexRec(int n)
{

    if (n <= 2)
    {
        return;
    }
    int count=0;
    int p = n;
    while (p > 0)
    {
        vector<int> temp(n);
        for (int i = 0; i < n; i++)
        {
            temp[i] = i ^ p;
            count++;
        }
        p >>= 1;
        count++;
    }

    vector<int> small(n);
    for (int i = 0; i < n; i++)
    {
        small[i] = i * i;
        count++;
    }

    if (n % 3 == 0)
    {
        reverse(small.begin(), small.end());
    }
    else
    {
        reverse(small.begin(), small.end());
    }

    complexRec(n / 2);
    complexRec(n / 2);
    complexRec(n / 2);
}

