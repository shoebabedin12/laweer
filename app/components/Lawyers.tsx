/* eslint-disable @typescript-eslint/no-explicit-any */
import { LawyeersPropTypes } from '@/app/types/DataTypes';
import LawyerCard from './LawyerCard';
import { unstable_ViewTransition as ViewTransition } from 'react';
import Link from 'next/link';

export default async function LawyersPage({
  showingOption,
}: LawyeersPropTypes) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_KEY}/lawyers`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch lawyers');
  }

  const data = await res.json();
  const lawyers = data.lawyers || [];

  // Filter according to showingOption
  const visibleLawyers = showingOption
    ? lawyers.slice(0, showingOption)
    : lawyers;

  return (
    <div className="mb-[100px]">
      <ViewTransition name="posts" className="via-blur" exit="duration-100">
        <div className="grid grid-cols-12 gap-4">
          <div className="heading-section col-span-12 mb-10 text-center">
            <h2 className="font-mulish text-[40px] font-extrabold text-(--color-text)">
              Our Best Lawyers
            </h2>
            <p className="font-mulish text-base font-normal text-(--color-text)/80">
              Our platform connects you with verified, experienced Lawyers
              across various specialties — all at your convenience. Whether
              it&apos;s a routine checkup or urgent consultation, book
              appointments in minutes and receive quality care you can trust.
            </p>
          </div>

          {visibleLawyers.length > 0 ? (
            <div className="col-span-12">
              <div className="grid grid-cols-12 gap-4 lg:gap-16">
                {visibleLawyers?.map((lawyer: any) => (
                  <ViewTransition
                    key={lawyer.id}
                    name={`lawyer-card-${lawyer.id}`}
                    className="via-blur"
                  >
                    <LawyerCard data={lawyer} />
                  </ViewTransition>
                ))}
              </div>
            </div>
          ) : (
            <>
              {typeof showingOption === 'number' &&
                showingOption > 0 &&
                Array.from({ length: showingOption }).map((_, i) => (
                  <div
                    key={i}
                    className="col-span-12 animate-pulse md:col-span-6"
                  >
                    <div className="bg-base-100 grid grid-cols-12 gap-4 rounded-2xl border border-(--color-text)/15 p-6">
                      <div className="col-span-12 lg:col-span-4">
                        <div className="h-[158px] w-full rounded-2xl bg-gray-300" />
                      </div>
                      <div className="col-span-12 space-y-3 lg:col-span-8">
                        <div className="h-4 w-1/4 rounded bg-gray-300" />
                        <div className="h-6 w-2/3 rounded bg-gray-300" />
                        <div className="h-4 w-1/2 rounded bg-gray-300" />
                        <div className="mt-4 h-10 w-full rounded bg-gray-300" />
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>

        {showingOption && visibleLawyers.length > 0 && (
          <div className="my-10 flex items-center justify-center">
            <Link
              href="/lawyers-profile"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-(--color-primary) px-[30px] py-[22px] text-[18px] font-bold text-white"
            >
              Show More Lawyers
            </Link>
          </div>
        )}
      </ViewTransition>
    </div>
  );
}
