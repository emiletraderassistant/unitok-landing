import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LANDING_FALLBACK } from '../data/landing.fallback';
import { mergeLandingWithRoi } from '../mappers/landing.mapper';
import { LandingData } from '../models/landing.model';
import { ProyectoRoi } from '../models/proyecto-roi.model';

@Injectable({ providedIn: 'root' })
export class LandingService {
  private readonly http = inject(HttpClient);

  getLanding(): Observable<LandingData> {
    return this.http.get<ProyectoRoi[]>(environment.roiApiUrl).pipe(
      map((rois) => mergeLandingWithRoi(LANDING_FALLBACK, rois)),
      catchError((error) => {
        console.warn('No se pudo cargar el ROI desde la API. Usando datos locales.', error);
        return of(LANDING_FALLBACK);
      }),
    );
  }
}
